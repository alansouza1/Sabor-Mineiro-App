# Sabor Mineiro - Frontend 🍲

A modern, responsive food delivery application inspired by industry leaders like iFood. Built with a focus on clean code, performance, and professional UX/UI patterns.

## 🚀 Highlights

*   **Fullstack Application:** Seamless integration with a production-like Spring Boot backend and PostgreSQL database.
*   **Enterprise Security:** JWT-based authentication featuring Role-Based Access Control (RBAC).
*   **Restricted Demo Mode:** Safe recruiter-friendly exploration with automated read-only permissions for the DEMO role.
*   **Mobile-First Design:** Fully optimized for responsiveness, providing a native-app-like experience on mobile devices (tested on Poco F7/Android/iOS).
*   **Professional Architecture:** Clean component granularity, custom hooks for logic separation, and global API interceptors.

---

## 🌐 Live Demo
[Link placeholder - e.g., Vercel or Netlify]

---

## 📸 Preview
![App Preview Placeholder](https://via.placeholder.com/800x400?text=Sabor+Mineiro+Frontend+Preview)

---

## ✨ Features

*   **Dynamic Menu:** Browse traditional Brazilian (Minas Gerais) dishes with real-time data from the backend.
*   **Persistent Cart:** Advanced cart management with quantity controls and special observations.
*   **Seamless Checkout:** Integrated flow for identification, address, and payment selection.
*   **Admin Dashboard:** A robust management panel for monitoring sales, orders, and managing the product catalog.
*   **Demo Access:** Dedicated read-only mode for recruiters and reviewers to explore administrative features safely.
*   **Global Security:** JWT-based authentication with automatic token handling via Axios interceptors.

---

## 🧱 Tech Stack

*   **React 19:** Utilizing latest hooks and patterns for efficient rendering.
*   **TypeScript:** Enforced type-safety across the entire component architecture.
*   **Vite:** Ultra-fast build tool and development server.
*   **Tailwind CSS:** Modern utility-first styling for a polished, responsive interface.
*   **Axios:** Centralized API service with global request/response interceptors.
*   **Lucide React:** Beautiful, consistent iconography.

---

## 🔌 API Integration

This frontend consumes a custom **Java Spring Boot REST API**. It follows professional integration standards, including:
*   Stateless authentication.
*   Global 401 (Unauthorized) and 403 (Forbidden) handling.
*   Dynamic redirection to intended routes after login.

## 🔗 Backend Repository

https://github.com/alansouza1/sabor-mineiro-api

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:8080/api
```

---

## 🚀 How to Run

1.  **Clone and Install:**
    ```bash
    npm install
    ```
2.  **Start Development Server:**
    ```bash
    npm run dev
    ```
3.  **Build for Production:**
    ```bash
    npm run build
    ```

---

## 🧪 Testing

The project uses **Vitest** and **React Testing Library** to ensure reliability and maintainability.

*   **Authentication Flows:** Validating login procedures and secure redirection for protected routes.
*   **Authorization & RBAC:** Ensuring Demo users are restricted from modification actions while maintaining full visibility.
*   **Business Logic:** Robust testing of cart calculations, order state management, and product filtering.

**Command:** `npm run test`

---

## 📁 Project Structure

```text
src/
├── components/     # UI Atoms, Layout, and specialized Admin/Cart components
├── hooks/          # Custom hooks for state management (useCart, useAuth, useOrders)
├── pages/          # Main route components (Home, Admin, Login, Profile)
├── services/       # API client configuration and endpoint definitions
├── types.ts        # Centralized TypeScript interfaces
└── test/           # Global test setup
```

---

## 🔐 Demo Access

To explore the Admin Panel without creating a new account, use the **"Demo Access"** button on the login page or enter:

*   **Email:** `demo@sabormineiro.com`
*   **Password:** `Demo@Mineiro#2026!Read`

> **🔒 Privacy Notice:** The Demo Dashboard is a shared environment. For your own security, please use **fictional data** (name, address, phone) during checkout. Orders are isolated per browser session using a `visitor_id`.

> **Note:** Demo users have **Read-Only** access. You can view orders and products, but creation, modification, or deletion actions are restricted.

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.
