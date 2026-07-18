import { Pencil, Trash2 } from "lucide-react";
import StatusBadge from "./StatusBadge";

function ApplicationTable({
  applications,
  onEdit,
  onDelete,
}) {
  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">

      <table className="w-full">

        <thead className="bg-slate-800">
          <tr>
            <th className="text-left p-4 text-slate-300">Company</th>
            <th className="text-left p-4 text-slate-300">Position</th>
            <th className="text-left p-4 text-slate-300">Status</th>
            <th className="text-left p-4 text-slate-300">Applied</th>
            <th className="text-center p-4 text-slate-300">Actions</th>
          </tr>
        </thead>

        <tbody>
          {applications.map((app) => (
            <tr
              key={app.id}
              className="border-t border-slate-800 hover:bg-slate-800/50 transition"
            >
              <td className="p-4 text-white">{app.company}</td>

              <td className="p-4 text-slate-300">{app.position}</td>

              <td className="p-4">
                <StatusBadge status={app.status} />
              </td>

              <td className="p-4 text-slate-300">{app.applied}</td>

              <td className="p-4">
                <div className="flex justify-center gap-3">
s<button
  onClick={() => onEdit(app)}
  className="text-blue-400 hover:text-blue-300"
>
  <Pencil size={18} />
</button>

<button
  onClick={() => onDelete(app)}
  className="text-red-400 hover:text-red-300"
>
  <Trash2 size={18} />
</button>
                </div>
              </td>
            </tr>
          ))}

          {applications.length === 0 && (
            <tr>
              <td
                colSpan="5"
                className="text-center text-slate-400 py-10"
              >
                No applications found.
              </td>
            </tr>
          )}
        </tbody>

      </table>

    </div>
  );
}

export default ApplicationTable;