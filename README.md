# IT Asset Manager – Backend API

This is the backend API for the **IT Asset Manager** SaaS application. Built with **Node.js**, **Express**, and **MongoDB**, it supports multi-tenant asset tracking, license management, support tickets, and secure user authentication.

> 🔗 Deployed on: [https://it-asset-manag-backend.onrender.com](https://it-asset-manag-backend.onrender.com)

---

## ⚙️ Tech Stack

- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Multi-tenancy support via `clinicId`
- Render (cloud deployment)
- dotenv for environment configuration

---

## 🚀 Features

- 🔐 JWT-based user auth (login/register)
- 🏥 Multi-tenancy by `clinicId`
- 🖥️ Asset & License management
- 🎫 Support ticket system
- 📅 Warranty expiry & renewal tracking
- ⚙️ RESTful API

---

## 🔧 Local Setup Instructions

### 1. Clone the repo:

- git clone https://github.com/yourusername/it-asset-backend.git
- cd it-asset-backend

### 2. Install dependencies:

- npm install

### 3. Add environment variables:
Create a .env file in the root:

PORT=5000
MONGO_URI=mongodb+srv://your-user:your-pass@cluster0.mongodb.net/your-db
JWT_SECRET=your-jwt-secret


### 4. Start the server
npm run dev