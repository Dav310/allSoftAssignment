
## Front-End Developer Assignment – Allsoft

This project is the frontend implementation of the **Login & Authentication Module** for the Document Management System.

Currently implemented features include:

- OTP Based Login Interface
- API Integration for OTP generation and validation
- Token handling
- Static Admin Page UI
- Responsive modern UI design

---

## Tech Stack Used

- React (Vite)
- Tailwind CSS
- Axios
- React Router DOM
- React Toastify

---

## Features Implemented

## OTP Based Login

- Mobile number input validation (10 digits)
- Generate OTP using backend API
- 6-digit premium OTP input UI
- Auto focus next input field
- OTP verification using API
- Token stored in localStorage after successful login
- Redirect to Dashboard after verification
- Resend OTP with countdown timer
- Fully responsive glassmorphism UI design

---

## API Integration

Integrated backend APIs:

- `POST /generateOTP`
- `POST /validateOTP`

Axios instance configuration includes:
- Base URL setup 
- Automatic token attachment via interceptor

---

## Admin Page (Static UI)

- Username field
- Password field
- Create User button
- Navigation between Login and Admin page

---

## Folder Structure (Current)

