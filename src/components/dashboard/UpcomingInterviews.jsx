function UpcomingInterviews({ interviews = [] }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white text-lg font-semibold">Upcoming Interviews</h3>
        <button className="text-blue-400 text-sm hover:text-blue-300">View calendar</button>
      </div>

      <div className="space-y-4">
        {interviews.map((interview, index) => (
          <div
            key={index}
            className="border border-slate-800 rounded-xl p-4 hover:border-slate-700 transition"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">{interview.company}</p>
                <p className="text-slate-400 text-sm">{interview.position}</p>
              </div>
              <div className="text-right">
                <p className="text-blue-400 font-medium">{interview.date}</p>
                <p className="text-slate-400 text-sm">{interview.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UpcomingInterviews;