import { Search, Plus } from "lucide-react";

function SearchFilter({
  search,
  setSearch,
  status,
  setStatus,
  sort,
  setSort,
  onAdd,
}) {
  return (
    <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 flex flex-col md:flex-row gap-4 justify-between items-center">

      {/* Search */}
      <div className="relative w-full md:w-80">
        <Search
          size={18}
          className="absolute left-3 top-3 text-slate-400"
        />

        <input
          type="text"
          placeholder="Search company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-slate-800 text-white rounded-lg pl-10 pr-4 py-2 outline-none border border-slate-700 focus:border-blue-500"
        />
      </div>

      {/* Filters */}
      <div className="flex gap-3">

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="bg-slate-800 text-white px-4 py-2 rounded-lg border border-slate-700"
        >
          <option>All</option>
          <option>Submitted</option>
          <option>Assessment</option>
          <option>Interview</option>
          <option>Job Offer</option>
          <option>Rejected</option>
          <option>Hired</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="bg-slate-800 text-white px-4 py-2 rounded-lg border border-slate-700"
        >
          <option>Newest</option>
          <option>Oldest</option>
        </select>

        <button
          onClick={onAdd}
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={18} />
          Add Application
        </button>

      </div>

    </div>
  );
}

export default SearchFilter;