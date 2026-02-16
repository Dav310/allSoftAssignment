import { useState } from "react";
import "/public/css/login.css";
import { useNavigate } from "react-router-dom";


const AdminPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("All fields are required");
      return;
    }

    alert("User Created (Static UI Only)");
    setUsername("");
    setPassword("");
  };

  return (
    <div className="flex relative justify-center items-center px-4 min-h-screen login-bg">

      {/* Glow Background Effects */}
      <div className="glow-circle glow1"></div>
      <div className="glow-circle glow2"></div>

      <div className="relative z-10 p-8 w-full max-w-md text-white rounded-3xl premium-card fade-in sm:p-10">

        {/* Header */}
        <h2 className="mb-2 text-3xl font-bold tracking-wide text-center">
          Admin Panel
        </h2>

        <p className="mb-8 text-sm text-center text-gray-300">
          Create New User Account
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Username Field */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Username
            </label>

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="px-4 py-3 w-full text-black rounded-xl modern-input"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="px-4 py-3 pr-12 w-full text-black rounded-xl modern-input"
                required
              />

              {/* Show / Hide Button */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 text-sm text-gray-600 -translate-y-1/2"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="py-3 w-full font-semibold bg-indigo-500 rounded-xl modern-btn hover:bg-indigo-600"
          >
            Create User
          </button>

        </form>

        {/* Back to Login Button */}
        <button
          onClick={() => navigate("/")}
          className="py-2 mt-4 w-full text-sm rounded-xl border transition border-white/30 hover:bg-white/10"
        >
          Back to Login
        </button>

      </div>
    </div>
  );
};

export default AdminPage;
