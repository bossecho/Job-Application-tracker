function StatusBadge({ status }) {
  const colors = {
    Submitted: "bg-yellow-500/20 text-yellow-400",
    "Application Reviewed": "bg-cyan-500/20 text-cyan-400",
    Assessment: "bg-indigo-500/20 text-indigo-400",
    Interview: "bg-blue-500/20 text-blue-400",
    "Job Offer": "bg-green-500/20 text-green-400",
    Hired: "bg-emerald-500/20 text-emerald-400",
    Rejected: "bg-red-500/20 text-red-400",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${
        colors[status] || "bg-slate-700 text-white"
      }`}
    >
      {status}
    </span>
  );
}

export default StatusBadge;