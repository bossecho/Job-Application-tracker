import { useEffect, useState } from "react";

import SearchFilter from "../components/applications/SearchFilter";
import ApplicationTable from "../components/applications/ApplicationTable";
import ApplicationModal from "../components/applications/ApplicationModal";
import DeleteModal from "../components/applications/DeleteModal";
import {
  createApplication,
  deleteApplication,
  getApplications,
  updateApplication,
} from "../services/api";

function Applications() {

  // ============================
  // State
  // ============================

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [sort, setSort] = useState("Newest");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingApplication, setEditingApplication] = useState(null);

  const [formData, setFormData] = useState({
    company: "",
    position: "",
    location: "",
    salary: "",
    status: "Submitted",
    applied: "",
    notes: "",
  });

  // ============================
  // Dummy Data
  // ============================

  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const loadApplications = async () => {
      try {
        const data = await getApplications();
        setApplications(data);
      } catch (error) {
        console.error("Failed to load applications", error);
      }
    };

    loadApplications();
  }, []);

  // ============================
  // Functions
  // ============================

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

const handleSaveApplication = async () => {
  if (!formData.company.trim() || !formData.position.trim()) {
    return;
  }

  try {
    if (editingApplication) {
      const updated = await updateApplication({ id: editingApplication.id, ...formData });
      if (updated.ok) {
        setApplications((prev) =>
          prev.map((app) =>
            app.id === editingApplication.id ? { ...app, ...formData } : app
          )
        );
      }
    } else {
      const created = await createApplication(formData);
      setApplications((prev) => [
        { id: created.id, ...formData },
        ...prev,
      ]);
    }
  } catch (error) {
    console.error("Failed to save application", error);
  }

  setFormData({
    company: "",
    position: "",
    location: "",
    salary: "",
    status: "Submitted",
    applied: "",
    notes: "",
  });

  setEditingApplication(null);
  setIsModalOpen(false);
};
  //Edit modal

  const handleEditApplication = (application) => {
  setEditingApplication(application);

  setFormData({
    company: application.company,
    position: application.position,
    location: application.location || "",
    salary: application.salary || "",
    status: application.status,
    applied: application.applied,
    notes: application.notes || "",
  });

  setIsModalOpen(true);
};

const handleDeleteApplication = (application) => {
  setSelectedApplication(application);
  setDeleteModalOpen(true);
};

const confirmDeleteApplication = async () => {
  if (!selectedApplication) return;

  try {
    await deleteApplication(selectedApplication.id);
    setApplications((prev) =>
      prev.filter((app) => app.id !== selectedApplication.id)
    );
  } catch (error) {
    console.error("Failed to delete application", error);
  }

  setDeleteModalOpen(false);
  setSelectedApplication(null);
};

  // ============================
  // Filter & Sort
  // ============================

  const filteredApplications = applications
    .filter((app) =>
      app.company.toLowerCase().includes(search.toLowerCase())
    )
    .filter((app) =>
      status === "All" ? true : app.status === status
    )
    .sort((a, b) => {
      if (sort === "Newest") {
        return new Date(b.applied) - new Date(a.applied);
      }

      return new Date(a.applied) - new Date(b.applied);
    });

  // ============================
  // UI
  // ============================

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold text-white">
          Applications
        </h1>

        <p className="text-slate-400">
          Manage all your job applications.
        </p>
      </div>

      <SearchFilter
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        sort={sort}
        setSort={setSort}
        onAdd={() => setIsModalOpen(true)}
      />

      <ApplicationTable
        applications={filteredApplications}
        onEdit={handleEditApplication}
        onDelete={handleDeleteApplication}

      />

      <ApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formData={formData}
        setFormData={setFormData}
        handleInputChange={handleInputChange}
        handleSaveApplication={handleSaveApplication}
        editingApplication={editingApplication}
      />

      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDeleteApplication}
      />

    </div>

    
  );

  
}

export default Applications;