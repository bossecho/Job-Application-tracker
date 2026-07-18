import { useEffect, useState } from "react";

import SearchFilter from "../components/wishlist/SearchFilter";
import WishlistTable from "../components/wishlist/WishlistTable";
import WishlistModal from "../components/wishlist/WishlistModal";
import DeleteModal from "../components/wishlist/DeleteModal";
import {
  createWishlistItem,
  deleteWishlistItem,
  getWishlist,
  updateWishlistItem,
} from "../services/api";

function Wishlist() {
  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const [formData, setFormData] = useState({
    company: "",
    position: "",
    priority: "Medium",
    website: "",
    notes: "",
  });

  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const loadWishlist = async () => {
      try {
        const data = await getWishlist();
        setWishlist(data);
      } catch (error) {
        console.error("Failed to load wishlist", error);
      }
    };

    loadWishlist();
  }, []);

  const filteredWishlist = wishlist
    .filter((item) =>
      item.company.toLowerCase().includes(search.toLowerCase())
    )
    .filter((item) =>
      priority === "All" ? true : item.priority === priority
    );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      company: "",
      position: "",
      priority: "Medium",
      website: "",
      notes: "",
    });
    setEditingItem(null);
  };

  const handleOpenAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setFormData({
      company: item.company,
      position: item.position,
      priority: item.priority,
      website: item.website || "",
      notes: item.notes || "",
    });
    setIsModalOpen(true);
  };

  const handleSaveWishlist = async () => {
    if (!formData.company.trim() || !formData.position.trim()) {
      return;
    }

    try {
      if (editingItem) {
        const updated = await updateWishlistItem({ id: editingItem.id, ...formData });
        if (updated.ok) {
          setWishlist((prev) =>
            prev.map((item) =>
              item.id === editingItem.id ? { ...item, ...formData } : item
            )
          );
        }
      } else {
        const created = await createWishlistItem(formData);
        setWishlist((prev) => [{ id: created.id, ...formData }, ...prev]);
      }
    } catch (error) {
      console.error("Failed to save wishlist item", error);
    }

    resetForm();
    setIsModalOpen(false);
  };

  const handleDeleteItem = (item) => {
    setSelectedItem(item);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedItem) return;

    try {
      await deleteWishlistItem(selectedItem.id);
      setWishlist((prev) => prev.filter((item) => item.id !== selectedItem.id));
    } catch (error) {
      console.error("Failed to delete wishlist item", error);
    }

    setSelectedItem(null);
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Wishlist</h1>
          <p className="text-slate-400">Companies you plan to apply to.</p>
        </div>

        <button
          type="button"
          onClick={handleOpenAddModal}
          className="bg-blue-600 hover:bg-blue-500 px-5 py-2 rounded-lg text-white transition"
        >
          + Add Company
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none"
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white"
        >
          <option>All</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
      </div>

      <WishlistTable
        items={filteredWishlist}
        onEdit={handleEditItem}
        onDelete={handleDeleteItem}
      />

      <WishlistModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          resetForm();
        }}
        formData={formData}
        handleInputChange={handleInputChange}
        handleSaveWishlist={handleSaveWishlist}
        editingItem={editingItem}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedItem(null);
        }}
        onConfirm={confirmDelete}
      />
    </div>
  );
}

export default Wishlist;