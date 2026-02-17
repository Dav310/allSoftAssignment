import { useEffect, useState } from "react";
import { uploadDocument, searchDocument } from "../api/authApi";
import { toast } from "react-toastify";


import "/public/css/dashboard.css";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [selectDate, setSelectDate] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [tags, setTags] = useState("");
  const [remarks, setRemarks] = useState("")
  const [selectFile, setSelectFile] = useState(null)

  // Fetch document 
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);

  // Search Document
  const [searchCategory, setSearchCategory] = useState("");
  const [searchTags, setSearchTags] = useState("");
  const [searchFromDates, setSearchFromDates] = useState("");
  const [searchToDates, setSearchToDates] = useState("");


  // Navigate
  const navigate = useNavigate();

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

  // Select File
  const handleFileSelect = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Allow file type 
    const allowedType = [
      "image/png",
      "image/jpeg",
      "application/pdf",
    ]

    if (!allowedType.includes(file.type)) {
      toast.error("Only Image & PDF files are allowed");
      return;
    }
    setSelectFile(file);

  }

  // Convert date from yyyy-MM-dd to dd-MM-yyyy
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  };

  // Convert comma-separated tags 
  const formatTags = (tagsString) => {
    if (!tagsString) return [];
    return tagsString
      .split(",")
      .map(tag => tag.trim())
      .filter(tag => tag !== "")
      .map(tag => ({ tag_name: tag }));
  };

  //Handle Submit 
  const handleSubmit = async () => {
    const userId = localStorage.getItem("user_id");
    console.log("User Id :", userId);


    if (!selectFile || !category || !subCategory || !selectDate || !tags || !remarks) {

      toast.error("Please fill all required fields")
      return;

    }

    try {
      const formData = new FormData();

      formData.append("file", selectFile);

      // Convert date to dd-MM-yyyy format
      const formattedDate = formatDate(selectDate);

      // Convert tags to required format
      const formattedTags = formatTags(tags);
      console.log("Formatted Tags:", formattedTags);

      // convert array into String
      formData.append(
        "data",
        JSON.stringify({
          user_id: userId,
          document_date: formattedDate,
          major_head: category,
          minor_head: subCategory,
          document_remarks: remarks,
          tags: formattedTags
        })
      );

      const response = await uploadDocument(formData);
      console.log("Upload Data :", response);


      // Reset form 
      setSelectDate("");
      setCategory("");
      setSubCategory("");
      setTags("");
      setRemarks("");
      setSelectFile(null);
      setIsDrawerOpen(false);

      toast.success("Document Upload Successfully")


    } catch (error) {
      console.error("Upload Error :", error);
      toast.error("Upload Document Failed")

    }

  }

  // Handle Search
  const handleSearch = async () => {
    try {

      const userId = localStorage.getItem("user_id");

      const response = await searchDocument({
        major_head: searchCategory || "",
        minor_head: "",
        from_date: searchFromDates || "",
        to_date: searchToDates || "",
        tags: searchTags
          ? searchTags.split(",").map((tag) => ({
            tag_name: tag.trim(),
          }))
          : [],

        uploaded_by: userId,
        start: 0,
        length: 10,
        filterId: "",
        search: { value: "" }
      });

      setDocuments(response.data.data || []);

    } catch (error) {
      console.error("Search Error:", error);
      toast.error("Search failed");
    }
  }

  // Handle Clear
  const handleClear = () => {
    setSearchCategory("");
    setSearchTags("");
    setSearchFromDates("");
    setSearchToDates("");
    fetchDocuments();
  }


  // Fetch Document
  const fetchDocuments = async () => {
    try {

      setLoading(true);

      const userId = localStorage.getItem("user_id");

      const response = await searchDocument({
        major_head: "",
        minor_head: "",
        from_date: "",
        to_date: "",
        tags: [],
        uploaded_by: userId,
        start: 0,
        length: 10,
        filterId: "",
        search: { value: "" }
      });

      // Backend ka actual response structure check karo
      console.log("Fetched Documents:", response.data.data);
      setDocuments(response.data.data || []);

    } catch (error) {
      console.error("Fetch Error:", error);
      toast.error("Failed to fetch documents");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDocuments();
  }, []);

  // Handle Logout
  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    toast.success("Logout Successfully")
    navigate("/")
  }



  return (
    <div className="min-h-screen bg-slate-900 text-white relative">

      {/*  Header  */}
      <div className="flex justify-between items-center px-8 py-5 bg-slate-800 shadow-lg">
        <h1 className="text-2xl font-bold">
          Dashboard
        </h1>

        <button
          onClick={handleLogOut}
          className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition">
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
              <select
                value={searchCategory}
                onChange={(e) => setSearchCategory(e.target.value)}
                className="dashboard-input text-black w-full">
                <option value="">Category</option>
                <option value="personal">Personal</option>
                <option value="professional">Professional</option>
              </select>
            </div>

            {/* Tags */}
            <div className="flex flex-col">
              <label className="mb-2 text-sm">Tags</label>
              <input
                value={searchTags}
                onChange={(e) => setSearchTags(e.target.value)}
                type="text"
                placeholder="Tags"
                className="dashboard-input text-black w-full"
              />
            </div>

            {/* From Date */}
            <div className="flex flex-col">
              <label className="mb-2 text-sm">From Date</label>
              <input
                value={searchFromDates}
                onChange={(e) => setSearchFromDates(e.target.value)}
                type="date"
                className="dashboard-input text-black w-full"
              />
            </div>

            {/* To Date */}
            <div className="flex flex-col">
              <label className="mb-2 text-sm">To Date</label>
              <input
                value={searchToDates}
                onChange={(e) => setSearchToDates(e.target.value)}
                type="date"
                className="dashboard-input text-black w-full"
              />
            </div>

            {/* Search Button */}
            <div>
              <button
                onClick={handleSearch}
                className="w-full py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
              >
                Search
              </button>
            </div>

            {/* Clear Button (Optional but Professional) */}
            <div>
              <button
                onClick={handleClear}
                className="w-full py-3 bg-gray-600 rounded-lg hover:bg-gray-700 transition"
              >
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
                  <th className="p-4">Category</th>
                  <th className="p-4">Tags</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>

              {/* <tbody>
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
              </tbody> */}
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="4" className="p-4 text-center">
                      Loading...
                    </td>
                  </tr>
                ) : documents.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="p-4 text-center text-gray-400">
                      No Documents Found
                    </td>
                  </tr>
                ) : (
                  documents.map((doc, index) => (
                    <tr
                      key={index}
                      className="border-t border-slate-600 hover:bg-slate-700 transition"
                    >
                      <td className="p-4">{doc.major_head}</td>
                      <td className="p-4">
                        {doc.tags && doc.tags.length > 0
                          ? doc.tags.map((tag) => tag.tag_name).join(", ")
                          : <span className="text-gray-400 italic">No tags</span>}
                      </td>
                      <td className="p-4">{new Date(doc.document_date).toLocaleDateString("en-GB")}</td>
                      <td className="p-4  space-x-3">
                        <button className="text-blue-400 hover:underline">
                          Preview
                        </button>
                        <button className="text-green-400 hover:underline">
                          Download
                        </button>
                      </td>
                    </tr>
                  ))
                )}
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
                value={selectDate}
                onChange={(e) => setSelectDate(e.target.value)}
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
                placeholder="Enter tags separated by commas (e.g., HR, 2024)"
                className="dashboard-input text-black w-full"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>

            {/* Remarks */}
            <div>
              <label className="block mb-2">Remarks</label>
              <textarea
                placeholder="Remarks"
                rows="3"
                className="dashboard-input text-black w-full"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
              ></textarea>
            </div>

            <div className="flex-1 border-2 border-dashed border-gray-400 rounded-xl p-8 text-center hover:border-blue-500 transition">
              <div className="flex flex-col justify-center items-center h-full">

                {/* Input */}
                <input
                  type="file"
                  accept=".png, .jpg, .jpeg, .pdf"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="fileUpload"
                />

                <label
                  htmlFor="fileUpload"
                  className="mt-4 px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition cursor-pointer"
                >
                  Choose File
                </label>

                {selectFile && (
                  <p className="mt-4 text-green-400 text-sm">
                    Selected : {selectFile.name}
                  </p>
                )}

                <p className="text-xs mt-4 text-gray-400">
                  Only Image & PDF allowed
                </p>

              </div>
            </div>

          </div>

          <div>
            <button
              onClick={handleSubmit}
              className="w-full py-2 mt-4 bg-green-600 rounded-lg hover:bg-green-700 transition"
            >
              Submit
            </button>
          </ div>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;
