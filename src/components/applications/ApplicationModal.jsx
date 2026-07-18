import { X } from "lucide-react";

function ApplicationModal({
  isOpen,
  onClose,
  formData,
  handleInputChange,
  handleSaveApplication,
  editingApplication,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">

      <div className="bg-slate-900 w-full max-w-2xl rounded-xl border border-slate-700">

        {/* Header */}
        <div className="flex justify-between items-center border-b border-slate-800 p-5">
          <h2 className="text-xl font-bold text-white">
            {editingApplication ? "Edit Application" : "Add Application"}
          </h2>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white"
          >
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* Company */}
          <div>
            <label className="text-slate-300 text-sm">Company</label>

            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              placeholder="Google"
              className="mt-2 w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none focus:border-blue-500"
            />
          </div>

          {/* Position */}
          <div>
            <label className="text-slate-300 text-sm">Position</label>

            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleInputChange}
              placeholder="IT Support"
              className="mt-2 w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none focus:border-blue-500"
            />
          </div>

          {/* Location */}
          <div>
            <label className="text-slate-300 text-sm">Location</label>

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Quezon City"
              className="mt-2 w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none focus:border-blue-500"
            />
          </div>

          {/* Salary */}
          <div>
            <label className="text-slate-300 text-sm">Salary</label>

            <input
              type="text"
              name="salary"
              value={formData.salary}
              onChange={handleInputChange}
              placeholder="₱20,000"
              className="mt-2 w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none focus:border-blue-500"
            />
          </div>

          {/* Status */}
          <div>
            <label className="text-slate-300 text-sm">Status</label>

            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="mt-2 w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none focus:border-blue-500"
            >
              <option>Submitted</option>
              <option>Application Reviewed</option>
              <option>Assessment</option>
              <option>Interview</option>
              <option>Job Offer</option>
              <option>Rejected</option>
              <option>Hired</option>
            </select>
          </div>

          {/* Applied Date */}
          <div>
            <label className="text-slate-300 text-sm">Applied Date</label>

            <input
              type="date"
              name="applied"
              value={formData.applied}
              onChange={handleInputChange}
              className="mt-2 w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none focus:border-blue-500"
            />
          </div>

          {/* Notes */}
          <div className="md:col-span-2">
            <label className="text-slate-300 text-sm">Notes</label>

            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              rows={4}
              placeholder="Additional notes..."
              className="mt-2 w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white resize-none outline-none focus:border-blue-500"
            />
          </div>

        </div>

        {/* Footer */}
        <div className="border-t border-slate-800 p-5 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white"
          >
            Cancel
          </button>

          <button
            onClick={handleSaveApplication}
            className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white"
          >
            {editingApplication ? "Update Application" : "Save Application"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default ApplicationModal;