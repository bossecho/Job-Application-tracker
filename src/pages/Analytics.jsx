import { useEffect, useState } from "react";

import {
  BarChart3,
  TrendingUp,
  Target,
  PieChart as PieIcon,
} from "lucide-react";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import { getAnalyticsData } from "../services/api";

const COLORS = [
  "#3b82f6",
  "#22c55e",
  "#ef4444",
  "#facc15",
];

function Analytics() {
  const [analyticsData, setAnalyticsData] = useState({
    summary: { total: 0, interviews: 0, successRate: 0, rejections: 0 },
    statusData: [],
    monthlyData: [],
    topCompanies: [],
    recentActivity: [],
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getAnalyticsData();
        setAnalyticsData(data);
      } catch (error) {
        console.error("Failed to load analytics data", error);
      }
    };

    loadData();
  }, []);
  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">
          Analytics
        </h1>

        <p className="text-slate-400 mt-1">
          Analyze your job application progress and performance.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

        <Card
          title="Total Applications"
          value={analyticsData.summary.total.toString()}
          color="blue"
          icon={<BarChart3 size={24} />}
        />

        <Card
          title="Interviews"
          value={analyticsData.summary.interviews.toString()}
          color="green"
          icon={<TrendingUp size={24} />}
        />

        <Card
          title="Success Rate"
          value={`${analyticsData.summary.successRate}%`}
          color="yellow"
          icon={<Target size={24} />}
        />

        <Card
          title="Rejections"
          value={analyticsData.summary.rejections.toString()}
          color="red"
          icon={<PieIcon size={24} />}
        />

      </div>

      {/* Charts */}
      <div className="grid xl:grid-cols-2 gap-6">

        {/* Pie Chart */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">

          <h2 className="text-xl font-semibold text-white mb-6">
            Applications by Status
          </h2>

          <div className="h-80">

            <ResponsiveContainer>

              <PieChart>

                <Pie
                  data={analyticsData.statusData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={110}
                  label
                >

                  {analyticsData.statusData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index]}
                    />
                  ))}

                </Pie>

                <Tooltip />

                <Legend />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* Bar Chart */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">

          <h2 className="text-xl font-semibold text-white mb-6">
            Monthly Applications
          </h2>

          <div className="h-80">

            <ResponsiveContainer>

              <BarChart data={analyticsData.monthlyData}>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#334155"
                />

                <XAxis
                  dataKey="month"
                  stroke="#94a3b8"
                />

                <YAxis
                  stroke="#94a3b8"
                />

                <Tooltip />

                <Bar
                  dataKey="applications"
                  fill="#3b82f6"
                  radius={[6, 6, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

      {/* Bottom Cards */}
      <div className="grid xl:grid-cols-2 gap-6">

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">

          <h2 className="text-xl font-semibold text-white mb-4">
            Top Companies Applied To
          </h2>

          <div className="space-y-4">

            {analyticsData.topCompanies.map((item) => (
              <Company key={item.company} company={item.company} count={item.count} />
            ))}

          </div>

        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">

          <h2 className="text-xl font-semibold text-white mb-4">
            Recent Activity
          </h2>

          <div className="space-y-4 text-slate-300">

            {analyticsData.recentActivity.map((item, index) => (
              <p key={`${item.text}-${index}`}>{item.text}</p>
            ))}

          </div>

        </div>

      </div>

    </div>
  );
}

function Card({ title, value, icon, color }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">

      <div className="flex justify-between items-center">

        <div>

          <p className="text-slate-400 text-sm">
            {title}
          </p>

          <h2 className="text-3xl font-bold text-white mt-2">
            {value}
          </h2>

        </div>

        <div className={`bg-${color}-500/10 text-${color}-400 p-3 rounded-xl`}>
          {icon}
        </div>

      </div>

    </div>
  );
}

function Company({ company, count }) {
  return (
    <div className="flex justify-between text-slate-300">
      <span>{company}</span>
      <span>{count} Applications</span>
    </div>
  );
}

export default Analytics;