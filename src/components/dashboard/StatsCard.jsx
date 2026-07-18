function StatsCard({
  title,
  value,
  subtitle,
  color = "blue",
  icon: Icon,
}) {
  const colorClasses = {
    blue: "bg-blue-500/10 text-blue-400",
    green: "bg-green-500/10 text-green-400",
    yellow: "bg-yellow-500/10 text-yellow-400",
    red: "bg-red-500/10 text-red-400",
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
      <div className="flex items-center justify-between">

        <div>
          <p className="text-slate-400 text-sm">{title}</p>

          <h3 className="text-3xl font-bold text-white mt-1">
            {value}
          </h3>

          {subtitle && (
            <p className={`text-sm mt-2 ${colorClasses[color]}`}>
              {subtitle}
            </p>
          )}
        </div>

        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClasses[color]}`}
        >
          {Icon && <Icon size={24} />}
        </div>

      </div>
    </div>
  );
}

export default StatsCard;