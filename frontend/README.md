# 📦 BudgetBox: Local-First Budget Tracker

![Next.js](https://img.shields.io/badge/Next.js-15-black) ![Node.js](https://img.shields.io/badge/Node.js-Express-green) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Supabase-blue) ![Status](https://img.shields.io/badge/Status-Offline%20Ready-success)

**BudgetBox** is a robust, offline-capable budget tracking application built with a **Local-First Architecture**. Unlike standard web apps, BudgetBox stores data locally on the device first (ensuring zero latency and offline access) and syncs to the cloud only when connectivity is available.

---

## 🚀 Key Features

* **Local-First Design:** Works 100% offline using Zustand Persist & LocalStorage.
* **Smart Sync:** Queues changes when offline and syncs to PostgreSQL when online.
* **Real-time Analytics:** Client-side calculation for Burn Rate, Savings Potential, and Expense forecasting.
* **Conflict Resolution:** Visual indicators for "Synced", "Pending", and "Local Only" states.

---

## 🛠️ Tech Stack

* **Frontend:** Next.js 15 (App Router), TypeScript, Tailwind CSS, Zustand (State & Persistence), Recharts.
* **Backend:** Node.js, Express.js.
* **Database:** PostgreSQL (Hosted on Supabase/Neon).

---

## ⚙️ Setup & Installation Steps

Follow these steps to run the project locally.

### 1. Clone the Repository
```bash
git clone [https://github.com/YOUR_USERNAME/budgetbox.git](https://github.com/YOUR_USERNAME/budgetbox.git)
cd budgetbox
````

### 2\. Backend Setup (The API)

The backend handles syncing data to the PostgreSQL database.

```bash
cd backend
npm install
```

**Create a `.env` file** inside the `backend` folder with your database credentials:

```env
PORT=4000
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.supa..."
```

**Start the Server:**

```bash
node server.js
# Output: ✅ Backend running on http://localhost:4000
```

### 3\. Frontend Setup (The UI)

Open a new terminal window for the frontend.

```bash
cd frontend
npm install
```

**Start the Client:**

```bash
npm run dev
# Open http://localhost:3000 in your browser
```

-----

## 🧪 How to Test "Offline Mode" (The Magic)

This app is designed to survive network failures. Follow this script to verify the Local-First behavior:

### Phase 1: Data Persistence (Works without Internet)

1.  Open the app at `http://localhost:3000`.
2.  **Stop the Backend Server** (Press `Ctrl+C` in the backend terminal) OR disconnect your WiFi.
3.  Refresh the browser page.
      * ✅ **Result:** The app **does not crash**. Your data is loaded instantly from LocalStorage.
4.  Edit the "Food" expense to a new number (e.g., `5000`).
      * ✅ **Result:** The update happens instantly. The Sync Status changes to **"Sync Pending"** (Orange).

### Phase 2: Syncing (Back Online)

1.  **Restart the Backend Server** (`node server.js`) and reconnect WiFi.
2.  Click the **"Sync Pending"** button in the top right.
3.  Wait a moment.
      * ✅ **Result:** The button turns Green (**"Synced"**).
4.  Check your Database (Supabase/Neon).
      * ✅ **Result:** The new value (`5000`) is saved in the cloud.

-----

## 📸 Architecture

```mermaid
graph TD
    A[User Input] -->|Updates Instantly| B(Zustand Store)
    B <-->|Persist/Hydrate| C{LocalStorage}
    B -->|On Sync Click| D[Node.js API]
    D -->|SQL Update| E[(PostgreSQL DB)]
    
    style C fill:#f9f,stroke:#333,stroke-width:2px
    style E fill:#bbf,stroke:#333,stroke-width:2px
```

-----

## 📄 License

This project is open source and available under the [MIT License](https://www.google.com/search?q=LICENSE).

```
```
