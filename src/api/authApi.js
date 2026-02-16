import axiosInstance from "./axiosInstance";

export const generateOtpApi = (mobile) => {
  return axiosInstance.post("/generateOTP", {
    mobile_number: mobile,
  });
};

export const validateOtpApi = (mobile, otp) => {
  return axiosInstance.post("/validateOTP", {
    mobile_number: mobile,
    otp: otp,
  });
};
