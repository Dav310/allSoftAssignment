import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { generateOtpApi, validateOtpApi } from "../api/authApi";

import "/public/css/login.css";


const Login = () => {
  const [mobile, setMobile] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const inputsRef = useRef([]);
  const navigate = useNavigate();

  // Countdown timer
  useEffect(() => {
    let interval;
    if (showOtp && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showOtp, timer]);

  const sendOtpRequest = async (type = "generate") => {

    if (mobile.length !== 10) {
      toast.error("Enter valid 10 digit mobile number");
      return;
    }
    try {
      await generateOtpApi(mobile);
      setShowOtp(true);
      setTimer(30);

      if (type === "resend") {

        toast.success("OTP Resent Successfully");

      } else {

        toast.success("OTP Sent Successfully");

      }
    } catch (error) {

      console.error("Error generating OTP:", error);
      toast.error("Failed to generate OTP");

    }
  };

  const handleSendOtp = () => {
    sendOtpRequest("generate");

  }

  const handleResendOtp = () => {
    sendOtpRequest("resend");
  }

  const handleOtpChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleVerifyOtp = async () => {
    const finalOtp = otp.join("");

    if (finalOtp.length !== 6) {
      toast.error("Enter complete OTP");
      return;

    }
    try {

      const response = await validateOtpApi(mobile, finalOtp);
      // console.log(response);

      const token = response.data.data?.token;

      if (token) {

        localStorage.setItem("token", token);
        toast.success("OTP Verified");
        navigate("/dashboard");

      }

    } catch (error) {

      console.error("Error validating OTP:", error);
      toast.error("Failed to validate OTP");

    }
  };


  return (
    <div className="flex relative justify-center items-center px-4 min-h-screen app-bg">

      {/* Glow Effects */}
      <div className="glow-circle glow1"></div>
      <div className="glow-circle glow2"></div>

      <div className="relative z-10 p-8 w-full max-w-md text-white rounded-3xl premium-card fade-in sm:p-10">

        <h2 className="mb-2 text-3xl font-bold tracking-wide text-center">
          Secure Login
        </h2>

        <p className="mb-8 text-sm text-center text-gray-300">
          Login using OTP verification
        </p>

        {/* Mobile Input */}
        {!showOtp && (
          <>
            <input
              type="text"
              maxLength="10"
              value={mobile}
              onChange={(e) =>
                setMobile(e.target.value.replace(/\D/g, ""))
              }
              placeholder="Enter Mobile Number"
              className="px-4 py-3 mb-6 w-full text-black rounded-xl modern-input"
            />

            <button
              onClick={handleSendOtp}
              className="py-3 w-full font-semibold bg-indigo-500 rounded-xl modern-btn hover:bg-indigo-600"
            >
              Send OTP
            </button>
          </>
        )}

        {/* OTP Section */}
        {showOtp && (
          <>
            <div className="flex gap-3 justify-center mb-8 sm:gap-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={digit}
                  ref={(el) => (inputsRef.current[index] = el)}
                  onChange={(e) =>
                    handleOtpChange(e.target.value, index)
                  }
                  className="otp-modern"
                />
              ))}
            </div>


            <button
              onClick={handleVerifyOtp}
              className="py-3 mb-4 w-full font-semibold bg-green-500 rounded-xl modern-btn hover:bg-green-600"
            >
              Verify OTP
            </button>

            {/* Timer */}
            <div className="text-sm text-center">
              <button
                onClick={handleResendOtp}
                disabled={timer > 0}
                className={`underline transition ${timer > 0
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:text-gray-300"
                  }`}
              >
                {timer > 0 ? `Resend OTP in ${timer}s` : "Resend OTP"}
              </button>
            </div>
          </>
        )}

        {/* Admin Navigation Button */}
        <button
          onClick={() => navigate("/admin")}
          className="py-2 mt-4 w-full text-sm rounded-xl border transition border-white/30 hover:bg-white/10"
        >
          Go to Admin Page
        </button>

      </div>
    </div>
  );
};

export default Login;
