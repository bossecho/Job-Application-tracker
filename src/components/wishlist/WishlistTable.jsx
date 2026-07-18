import { ExternalLink, Pencil, Trash2 } from "lucide-react";

function WishlistTable({ items, onEdit, onDelete }) {
  const priorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-green-500/20 text-green-400";
      case "Medium":
        return "bg-yellow-500/20 text-yellow-400";
      case "Low":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-slate-700 text-white";
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
      <table className="w-full">
        <thead className="bg-slate-800">
          <tr>
            <th className="text-left p-4 text-slate-300">Company</th>
            <th className="text-left p-4 text-slate-300">Position</th>
            <th className="text-left p-4 text-slate-300">Priority</th>
            <th className="text-left p-4 text-slate-300">Website</th>
            <th className="text-center p-4 text-slate-300">Actions</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr
              key={item.id}
              className="border-t border-slate-800 hover:bg-slate-800/40"
            >
              <td className="p-4 text-white">{item.company}</td>
              <td className="p-4 text-slate-300">{item.position}</td>
              <td className="p-4">
                <span className={`px-3 py-1 rounded-full text-sm ${priorityColor(item.priority)}`}>
                  {item.priority}
                </span>
              </td>
              <td className="p-4">
                {item.website ? (
                  <a
                    href={item.website}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-blue-400 hover:underline"
                  >
                    Visit <ExternalLink size={14} />
                  </a>
                ) : (
                  <span className="text-slate-500">—</span>
                )}
              </td>
              <td className="p-4">
                <div className="flex justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => onEdit(item)}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    type="button"
                    onClick={() => onDelete(item)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}

          {items.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center py-10 text-slate-400">
                No companies found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default WishlistTable;
