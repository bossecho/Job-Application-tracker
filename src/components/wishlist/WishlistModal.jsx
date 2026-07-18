import { X } from "lucide-react";

function WishlistModal({
  isOpen,
  onClose,
  formData,
  handleInputChange,
  handleSaveWishlist,
  editingItem,
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-slate-900 w-full max-w-xl rounded-xl border border-slate-700"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center border-b border-slate-800 p-5">
          <h2 className="text-xl font-bold text-white">
            {editingItem ? "Edit Wishlist Company" : "Add Wishlist Company"}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white"
          >
            <X size={22} />
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="text-slate-300 text-sm">Company</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              placeholder="Google"
              required
              className="mt-2 w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-slate-300 text-sm">Position</label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleInputChange}
              placeholder="Software Engineer"
              required
              className="mt-2 w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-slate-300 text-sm">Priority</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
              className="mt-2 w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none focus:border-blue-500"
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>

          <div>
            <label className="text-slate-300 text-sm">Website</label>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleInputChange}
              placeholder="https://careers.example.com"
              className="mt-2 w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none focus:border-blue-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-slate-300 text-sm">Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              rows={4}
              placeholder="Track application notes or research here..."
              className="mt-2 w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white resize-none outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="border-t border-slate-800 p-5 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSaveWishlist}
            className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white"
          >
            {editingItem ? "Update Company" : "Save Company"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default WishlistModal;
