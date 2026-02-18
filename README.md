# Front-End Developer Assignment – Allsoft

## Project Overview

This project is the frontend implementation of a **Document Management System**, focusing on the **Login & Authentication Module** and **Document Upload** functionalities. It provides a modern, responsive user interface for managing documents with secure OTP-based authentication.

## Table of Contents

- [Project Overview](#project-overview)
- [How It Works](#how-it-works)
- [Getting Started](#getting-started)
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [Tech Stack](#tech-stack)
- [Features](#features-implemented)

## How It Works

### 1. Authentication Flow

1. **Enter Mobile Number:** The user inputs a valid 10-digit mobile number on the login page.
2. **Request OTP:** Upon submission, the system sends a request to the `/generateOTP` endpoint.
3. **Enter OTP:** A 6-digit OTP input field appears. The user enters the code received.
4. **Verification:** The system validates the OTP via the `/validateOTP` endpoint.
5. **Access Granted:** On success, a JWT token is stored in local storage, and the user is redirected to the Dashboard.

### 2. Document Upload Process

1. **Navigate to Dashboard:** Authenticated users access the centralized dashboard.
2. **Fill Details:** Users select a date, categorize the document (Major/Minor Head), and add descriptive tags.
3. **Upload File:** Users can drag and drop or select a file (PDF or Image).
4. **Submit:** The form data is validated and sent to the server.

## Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- npm (Node Package Manager)

### Installation

1. Navigate to the client directory:

   ```bash
   cd client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

## Running the Application

To start the development server:

```bash
npm run dev
```

The application will launch in your default browser, typically at `http://localhost:5173`.

To build the application for production:

```bash
npm run build
```


## Tech Stack

- **Core:** React (powered by Vite)
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM
- **State/Network:** Axios for API requests
- **UI Libraries:**
  - React Toastify (Notifications)
  - React Icons

## Features Implemented

### Authentication & Login

- **OTP Based Login:**
  - Mobile number validation (10 digits).
  - 6-digit OTP input with auto-focus.
  - Timer-based Resend OTP functionality.
- **Security:**
  - Axios interceptors for automatic token attachment.
  - Backend integration (`/generateOTP`, `/validateOTP`).

### Document Management (Dashboard)

- **File Upload Interface:**
  - **Date selection :** Date selection.
  - **Categorization:** Dynamic Major Head (Category) and Minor Head (Subcategory) dropdowns.
  - **Tagging:** Interactive tag input system with chip styling.
  - **Remarks:** Text area for additional notes.
  - **Validation:** Enforces file types (Images & PDF only).

### Admin Interface

- Static UI for user creation and management.
- Navigation between Login and Admin sections.
