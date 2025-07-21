# 📝 Keeper - Notes Keeping Web App

**Keeper** is a lightweight and responsive note-taking web application that allows users to create, view, and manage their notes efficiently. Built with **React.js**, **Vite**, and **Tailwind CSS**, it delivers a fast and seamless user experience.

---

## 🚀 Features

- 📝 Create and manage personal notes
- 💾 **Data persistence**: Notes are saved to the server and retained even after a page refresh
- ⚡ **Debounced input fields** to reduce unnecessary API calls and server load
- 🌐 **Client-side routing** using React Router DOM
- 🎨 Clean and responsive UI with **Tailwind CSS** and **React Icons**

---

## 🧪 Key Implementations

### 🔄 Data Persistence
Notes are automatically saved and synced with the backend, ensuring no loss of data even if the page is refreshed.

### ⏳ Debouncing
Debouncing is used in input fields to delay API calls until the user stops typing. This:
- Minimizes server requests
- Enhances app speed and responsiveness
- Improves performance on slower connections

> **What is Debouncing?**  
> Debouncing is a technique where a function (e.g., API call) is delayed until the user stops performing an action (like typing), preventing frequent, unnecessary executions.

---

## 🧰 Tech Stack

- **Frontend**:
  - React.js (with Hooks)
  - Vite (for fast development)
  - Tailwind CSS (for styling)
  - React Router DOM (for navigation)
  - React Icons (for UI enhancements)

- **Backend**: (Assumed or to be added if used)
  - API endpoints (for CRUD operations)
  - [Optional: Node.js/Express.js]

---

## 📂 Folder Structure (Example)

```bash
keeper/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── utils/
│   └── App.jsx
├── tailwind.config.js
└── README.md
