import axiosInstance from "./axiosInstance";

// Generate Otp
export const generateOtpApi = (mobile) => {
  return axiosInstance.post("/generateOTP", {
    mobile_number: mobile,
  });
};

// Validate Otp
export const validateOtpApi = (mobile, otp) => {
  return axiosInstance.post("/validateOTP", {
    mobile_number: mobile,
    otp: otp,
  });
};

// Upload document
export const uploadDocument = (formData) => {
  return axiosInstance.post("/saveDocumentEntry", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};