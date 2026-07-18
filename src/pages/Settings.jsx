import { useState } from "react";
import {
  User,
  Bell,
  Moon,
  Database,
  Save,
} from "lucide-react";

export default function Settings() {
  const [settings, setSettings] = useState({
    fullName: "Jericho Maghilom",
    email: "jericho@example.com",
    darkMode: true,
    notifications: true,
    autoBackup: false,
    dailyGoal: 5,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const saveSettings = () => {
    alert("Settings saved successfully!");
  };

  return (
    <div className="p-6 space-y-6 text-white">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-gray-400 mt-1">
          Customize your Job Application Tracker.
        </p>
      </div>

      {/* Profile */}
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">

        <div className="flex items-center gap-2 mb-6">
          <User className="text-blue-500" size={22} />
          <h2 className="text-xl font-semibold">Profile</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5">

          <div>
            <label className="block mb-2 text-gray-300">
              Full Name
            </label>

            <input
              type="text"
              name="fullName"
              value={settings.fullName}
              onChange={handleChange}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-300">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={settings.email}
              onChange={handleChange}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

        </div>

      </div>

      {/* Preferences */}
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">

        <div className="flex items-center gap-2 mb-6">
          <Moon className="text-blue-500" size={22} />
          <h2 className="text-xl font-semibold">
            Preferences
          </h2>
        </div>

        <div className="space-y-6">

          <div className="flex justify-between items-center">
            <span className="text-gray-300">
              Dark Mode
            </span>

            <input
              type="checkbox"
              name="darkMode"
              checked={settings.darkMode}
              onChange={handleChange}
              className="w-5 h-5 accent-blue-600"
            />
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-300">
              Daily Application Goal
            </span>

            <input
              type="number"
              name="dailyGoal"
              value={settings.dailyGoal}
              onChange={handleChange}
              className="w-24 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-center text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

        </div>

      </div>

      {/* Notifications */}
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">

        <div className="flex items-center gap-2 mb-6">
          <Bell className="text-blue-500" size={22} />
          <h2 className="text-xl font-semibold">
            Notifications
          </h2>
        </div>

        <div className="flex justify-between items-center">

          <span className="text-gray-300">
            Enable Notifications
          </span>

          <input
            type="checkbox"
            name="notifications"
            checked={settings.notifications}
            onChange={handleChange}
            className="w-5 h-5 accent-blue-600"
          />

        </div>

      </div>

      {/* Backup */}
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">

        <div className="flex items-center gap-2 mb-6">
          <Database className="text-blue-500" size={22} />
          <h2 className="text-xl font-semibold">
            Backup
          </h2>
        </div>

        <div className="flex justify-between items-center">

          <span className="text-gray-300">
            Automatic Backup
          </span>

          <input
            type="checkbox"
            name="autoBackup"
            checked={settings.autoBackup}
            onChange={handleChange}
            className="w-5 h-5 accent-blue-600"
          />

        </div>

      </div>

      {/* Save Button */}
      <div>

        <button
          onClick={saveSettings}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-lg font-medium"
        >
          <Save size={18} />
          Save Changes
        </button>

      </div>

    </div>
  );
}