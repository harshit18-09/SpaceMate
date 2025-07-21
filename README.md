# 🚀 SpaceMate

**SpaceMate** is a smart web application that helps students navigate their campus crowd-free. It provides real-time visualizations of crowd levels in different zones, enabling smarter and more efficient movement across the campus.

---

## 🧠 Key Features

- 📍 **Live Crowd Data**: Real-time tracking of crowd density across various campus zones.
- 🗺️ **Interactive Heatmap**: Color-coded map (Green / Orange / Red) for quick glance of zone occupancy.
- 🪟 **Zone Modals**: Clickable zones with detailed info and crowd count popups.
- 🛠️ **Role-Based Access**: Separate views and controls for students and admins.
- ✨ **Responsive UI**: Built with React + Tailwind for a clean and responsive experience.
- 🔌 **Full Stack Integration**: Connected to a Node.js + Express + MongoDB backend.

---

## 🗂️ Project Structure

```
SpaceMate/
├── client/                  # Frontend (React + Vite)
│   ├── src/
│   │   ├── pages/           # Route-level pages (Home, Map, Admin, etc.)
│   │   ├── components/      # Reusable UI components (Navbar, ZoneModal, etc.)
│   │   ├── assets/          # Static assets (images, icons)
│   │   └── App.jsx
│   └── index.html
│
├── server/                 # Backend (Node.js + Express)
│   ├── models/             # Mongoose models (e.g., Room.js)
│   ├── routes/             # API routes (e.g., /rooms)
│   └── index.js            # Entry point for Express server
│
└── README.md               # Project documentation
```

---

## 🧑‍💻 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/harshit18-09/SpaceMate.git
cd SpaceMate
```

### 2. Setup Backend

```bash
cd server
npm install
# Create a `.env` file with your MongoDB connection string
npm start
```

### 3. Setup Frontend

```bash
cd client
npm install
npm run dev
```



## 🛠️ Tech Stack

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB (Mongoose)
- **Auth**: Basic login (Admin/User roles)
- **Deployment**: *(To be added)*

---

## 🙌 Contributors

- 👨‍💻 [Harshit Chugh](https://github.com/harshit18-09) – Full Stack Developer

---

## 📃 License

This project is licensed under the [MIT License](LICENSE).
