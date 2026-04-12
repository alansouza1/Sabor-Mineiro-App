# Sabor Mineiro - Frontend 🍲

A modern, responsive food delivery application inspired by industry leaders like iFood. Built with a focus on clean code, performance, and professional UX/UI patterns.

---

## 🌐 Live Demo
[Link placeholder - e.g., Vercel or Netlify]

---

## 📸 Preview
![App Preview Placeholder](https://via.placeholder.com/800x400?text=Sabor+Mineiro+Frontend+Preview)

---

## ✨ Features

*   **Dynamic Menu:** Browse traditional Mineiro dishes with real-time data from the backend.
*   **Persistent Cart:** Advanced cart management with quantity controls and special observations.
*   **Seamless Checkout:** Integrated flow for identification, address, and payment selection.
*   **Admin Dashboard:** A robust management panel for monitoring sales, orders, and managing the product catalog.
*   **Acesso Demo:** Dedicated read-only mode for recruiters and reviewers to explore administrative features safely.
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

The project uses **Vitest** and **React Testing Library** to ensure reliability.
*   **Core Flows:** Tests for login, cart logic, and protected route redirection.
*   **Command:** `npm run test`

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

To explore the Admin Panel without creating a new account, use the **"Acesso Demo"** button on the login page or enter:

*   **Email:** `demo@sabormineiro.com`
*   **Password:** `Demo@Mineiro#2026!Read`

> **Note:** Demo users have **Read-Only** access. You can view orders and products, but creation, modification, or deletion actions are restricted.

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.
