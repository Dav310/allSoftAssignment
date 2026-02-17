import { useState } from "react";
import "/public/css/dashboard.css";


const Dashboard = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");

  // Category Options
  const personalOptions = ["John", "Tom", "Emily"];
  const professionalOptions = ["Accounts", "HR", "IT", "Finance"];

  // Sub Category Options
  const subOptions =
    category === "Personal"
      ? personalOptions
      : category === "Professional"
        ? professionalOptions
        : [];


  return (
    <div className="min-h-screen bg-slate-900 text-white relative">

      {/*  Header  */}
      <div className="flex justify-between items-center px-8 py-5 bg-slate-800 shadow-lg">
        <h1 className="text-2xl font-bold">
          Dashboard
        </h1>

        <button className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition">
          Logout
        </button>
      </div>

      {/* Main Content  */}
      <div className="p-8">

        {/*  Search Section  */}
        <div className="bg-slate-800 p-6 rounded-xl mb-6 shadow-md">

          <div className="grid md:grid-cols-6 gap-4 items-end">

            {/* Category */}
            <div className="flex flex-col">
              <label className="mb-2 text-sm">Category</label>
              <select className="dashboard-input text-black w-full">
                <option value="">Category</option>
                <option value="personal">Personal</option>
                <option value="professional">Professional</option>
              </select>
            </div>

            {/* Tags */}
            <div className="flex flex-col">
              <label className="mb-2 text-sm">Tags</label>
              <input
                type="text"
                placeholder="Tags"
                className="dashboard-input text-black w-full"
              />
            </div>

            {/* From Date */}
            <div className="flex flex-col">
              <label className="mb-2 text-sm">From Date</label>
              <input
                type="date"
                className="dashboard-input text-black w-full"
              />
            </div>

            {/* To Date */}
            <div className="flex flex-col">
              <label className="mb-2 text-sm">To Date</label>
              <input
                type="date"
                className="dashboard-input text-black w-full"
              />
            </div>

            {/* Search Button */}
            <div>
              <button className="w-full py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition">
                Search
              </button>
            </div>

            {/* Clear Button (Optional but Professional) */}
            <div>
              <button className="w-full py-3 bg-gray-600 rounded-lg hover:bg-gray-700 transition">
                Clear
              </button>
            </div>

          </div>

        </div>

        {/*  Action Bar  */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            Uploaded Documents
          </h2>

          <button
            onClick={() => setIsDrawerOpen(true)}
            className="bg-indigo-600 px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            + Add Document
          </button>
        </div>

        {/*  Document Table  */}
        <div className="bg-slate-800 rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-700">
                <tr>
                  <th className="p-4">File Name</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Tags</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-t border-slate-600 hover:bg-slate-700 transition">
                  <td className="p-4">invoice.pdf</td>
                  <td className="p-4">Professional</td>
                  <td className="p-4">HR, 2024</td>
                  <td className="p-4">12/03/2024</td>
                  <td className="p-4 space-x-3 text-center">
                    <button className="text-blue-400 hover:underline">
                      Preview
                    </button>
                    <button className="text-green-400 hover:underline">
                      Download
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Right Side Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-96 bg-slate-800 shadow-2xl transform transition-transform duration-300 flex flex-col ${isDrawerOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="p-6 ">

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              Add Document
            </h2>

            <button
              onClick={() => setIsDrawerOpen(false)}
              className="text-red-400"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-4">
            {/* Date */}
            <div>
              <label className="block mb-2">Date</label>
              <input
                type="date"
                className="dashboard-input text-black w-full"
              />
            </div>

            {/* Category */}
            <div className="flex flex-col gap-4">

              <div>
                <label className="block mb-2">Category</label>
                <select
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setSubCategory("");
                  }}
                  className="dashboard-input text-black w-full"
                >
                  <option value="">Select Category</option>
                  <option value="Personal">Personal</option>
                  <option value="Professional">Professional</option>
                </select>
              </div>

              {category && (
                <div>
                  <label className="block mb-2">
                    {category === "Personal"
                      ? "Select Name"
                      : "Select Department"}
                  </label>
                  <select
                    value={subCategory}
                    onChange={(e) => setSubCategory(e.target.value)}
                    className="dashboard-input text-black w-full"
                  >
                    <option>Select</option>
                    {subOptions.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Tags */}
            <div>
              <label className="block mb-2">Tags</label>
              <input
                type="text"
                placeholder="Tags"
                className="dashboard-input text-black w-full"
              />
            </div>

            {/* Remarks */}
            <div>
              <label className="block mb-2">Remarks</label>
              <textarea
                placeholder="Remarks"
                rows="3"
                className="dashboard-input text-black w-full"
              ></textarea>
            </div>

            <div className="flex-1 border-2 border-dashed border-gray-400 rounded-xl p-8 text-center hover:border-blue-500 transition">
              <div className="flex flex-col justify-center items-center h-full">
                <p className="text-gray-300">
                  Drag & drop your file here
                </p>

                <p className="text-xs text-gray-400 mt-2">or</p>

                <button className="mt-4 px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition">
                  Choose File
                </button>

                <p className="text-xs mt-4 text-gray-400">
                  Only Image & PDF allowed
                </p>
              </div>
            </div>





          </div>

          <div>
            <button className="w-full py-2 mt-4 bg-green-600 rounded-lg hover:bg-green-700 transition">
              Submit
            </button>
          </ div>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;
