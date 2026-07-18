import { TriangleAlert } from "lucide-react";

function DeleteModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-md">
        <div className="p-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-red-500/20 p-4 rounded-full">
              <TriangleAlert className="text-red-500" size={32} />
            </div>
          </div>

          <h2 className="text-xl font-bold text-white">Remove from Wishlist</h2>

          <p className="text-slate-400 mt-2">
            Are you sure you want to remove this company from your wishlist?
          </p>

          <p className="text-red-400 text-sm mt-1">
            This action cannot be undone.
          </p>
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
            onClick={onConfirm}
            className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
