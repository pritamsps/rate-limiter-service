# 🧑‍💻 Full-Stack User Management Dashboard

A complete **Full-Stack User Management Application** demonstrating a robust **CRUD workflow** — built with a **Node.js + Express.js backend**, a **Vue.js + Vuetify frontend**, and a **MySQL database** running in **Docker**.  

This project showcases end-to-end full-stack development skills: database design, RESTful API development, and dynamic UI integration.

---

## 🚀 Features

### 👤 Complete User Management
- **Create** – Add new users via a modal form.  
- **Read** – View all users in a paginated, searchable table.  
- **Update** – Edit user details (Name, Email, City) seamlessly in a dialog box.  
- **Delete** – Remove users with confirmation prompts.  

### 📊 Interactive Data Table
- **Dynamic Table:** Built using Vuetify’s `v-data-table`.  
- **Live Search & Filter:** Real-time filtering across all columns.  
- **Pagination:** Displays 25 rows per page with full navigation control.  

### ⚙️ Efficient RESTful Backend
- Built using **Express.js** and **MySQL2**.  
- Implements **server-side pagination** for scalability.  
- Includes a **database seeding script** (`seed.js`) that generates 1,000 random users using an external API.  

### 💎 User Experience
- Single-page layout for a seamless experience.  
- **Non-blocking notifications** for feedback (e.g., “User updated successfully”).  
- **Loading indicators** for all CRUD operations.  

---

## 🛠️ Tech Stack

| Area | Technology / Library |
|------|-----------------------|
| **Backend** | Node.js, Express.js, mysql2, cors, uuid |
| **Database** | MySQL (via Docker) |
| **Frontend** | Vue.js, Vuetify, Axios (via CDN) |
| **Dev Tools** | Node.js, Docker Desktop |

---

## ⚙️ Setup Instructions

### 1️⃣ Initial Setup (First Time Only)

#### Clone the Repository
```bash
git clone <your-github-repository-url>
cd <your-project-folder>
npm install
