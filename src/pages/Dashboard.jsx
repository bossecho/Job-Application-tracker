import { useEffect, useState } from "react";

import StatsCard from "../components/dashboard/StatsCard";
import ProgressChart from "../components/dashboard/ProgressChart";
import RecentApplications from "../components/dashboard/RecentApplications";
import UpcomingInterviews from "../components/dashboard/UpcomingInterviews";
import { getDashboardData } from "../services/api";

import {
  Briefcase,
  Clock3,
  CalendarDays,
  CircleX,
} from "lucide-react";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState({
    stats: { total: 0, pending: 0, interviews: 0, rejected: 0, hired: 0 },
    recent: [],
    progress: [],
    upcoming: [],
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getDashboardData();
        setDashboardData(data);
      } catch (error) {
        console.error("Failed to load dashboard data", error);
      }
    };

    loadData();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white">Welcome back, Jericho!</h2>
          <p className="text-slate-400 mt-1">Track your applications and stay organized.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatsCard title="Total Applications" value={dashboardData.stats.total.toString()} subtitle="From the database" color="blue" icon={Briefcase} />
        <StatsCard title="Pending" value={dashboardData.stats.pending.toString()} subtitle="Waiting" color="yellow" icon={Clock3} />
        <StatsCard title="Interviews" value={dashboardData.stats.interviews.toString()} subtitle="Upcoming" color="green" icon={CalendarDays} />
        <StatsCard title="Rejected" value={dashboardData.stats.rejected.toString()} subtitle="Keep going" color="red" icon={CircleX} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <ProgressChart data={dashboardData.progress} />
        </div>

        <div>
          <UpcomingInterviews interviews={dashboardData.upcoming} />
        </div>
      </div>

      <RecentApplications applications={dashboardData.recent} />
    </div>
  );
}

export default Dashboard;
