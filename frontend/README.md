# 📦 BudgetBox: Local-First Budget Tracker

BudgetBox is a robust, offline-capable budget tracking application built with **Next.js 15** and **Local-First Architecture**. It ensures users can manage their finances seamlessly, even without an internet connection, and syncs data to the cloud when connectivity is restored.

[Insert Screenshot Here]

## 🚀 Key Features

* **Local-First Design:** Works 100% offline using Zustand Persist (LocalStorage).
* **Smart Sync:** Syncs data to PostgreSQL when online with conflict resolution logic.
* **Real-time Analytics:** Client-side calculation for Burn Rate, Savings, and Projections.
* **Responsive UI:** Built with Tailwind CSS for mobile and desktop.

## 🛠️ Tech Stack

**Frontend:**
* Next.js 15 (App Router)
* TypeScript
* Zustand (State Management + Persistence)
* Recharts (Analytics)
* Tailwind CSS

**Backend:**
* Node.js & Express
* PostgreSQL (via Supabase/Neon)

## 🏗️ Architecture

[Frontend (Zustand Store)] <---> [LocalStorage (Offline Data)]
           |
           v
      (Sync Button)
           |
           v
   [Node.js API Layer] <---> [PostgreSQL Database]

## ⚙️ Setup & Installation

### 1. Clone the repository
```bash
git clone [https://github.com/YOUR_USERNAME/budgetbox.git](https://github.com/YOUR_USERNAME/budgetbox.git)
cd budgetbox
