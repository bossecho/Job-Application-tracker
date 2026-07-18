function RecentApplications({ applications = [] }) {
  const statusClasses = {
    Pending: "bg-yellow-500/10 text-yellow-400",
    Submitted: "bg-slate-700/20 text-slate-300",
    Assessment: "bg-indigo-500/10 text-indigo-400",
    Interview: "bg-blue-500/10 text-blue-400",
    Offer: "bg-green-500/10 text-green-400",
    Hired: "bg-green-500/10 text-green-400",
    Rejected: "bg-red-500/10 text-red-400",
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white text-lg font-semibold">Recent Applications</h3>
        <button className="text-blue-400 text-sm hover:text-blue-300">View all</button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-800">
              <th className="text-left text-slate-400 text-sm font-medium pb-3">Company</th>
              <th className="text-left text-slate-400 text-sm font-medium pb-3">Position</th>
              <th className="text-left text-slate-400 text-sm font-medium pb-3">Status</th>
              <th className="text-left text-slate-400 text-sm font-medium pb-3">Date</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((app, index) => (
              <tr key={index} className="border-b border-slate-800/50">
                <td className="py-4">
                  <p className="text-white font-medium">{app.company}</p>
                </td>
                <td className="py-4 text-slate-300">{app.position}</td>
                <td className="py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusClasses[app.status] || "bg-slate-700/20 text-slate-300"}`}
                  >
                    {app.status}
                  </span>
                </td>
                <td className="py-4 text-slate-300">{app.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentApplications;