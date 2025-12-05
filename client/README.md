# 🧬 Anoxion – Your Anoxia Companion (Frontend)

**Anoxion** is the web application companion for the anoxia system.  
It allows users to **view and manage their linked devices**, monitor **connection status**, and track **active processes** in real time, as well as **past processes** with their final results.

---

## 🚀 Tech Stack

- ⚡ **Vite** – blazing-fast development environment.
- ⚛️ **React 18** – modular and dynamic UI.
- 🧠 **TypeScript** – static typing for reliability and scalability.
- 🎨 **Tailwind CSS** (optional) – fast, responsive styling.
- 🌐 **Axios / Fetch API** – backend communication.
- 🔗 **React Router DOM** – navigation and routing.
- 🔒 **JWT Auth** (planned) – token-based authentication.

---

## 📁 Project Structure

-this is a basic structure to be defined in the final version

```markdown

anoxion/
├── public/
│ ├── favicon.ico
│ └── manifest.json
├── src/
│ ├── assets/ # Static resources (icons, logos, etc.)
│ ├── components/ # Reusable UI components (Cards, Charts, etc.)
│ ├── hooks/ # Custom hooks (useAuth, useFetch, etc.)
│ ├── pages/ # Main pages (Login, Dashboard, Devices, Process)
│ ├── services/ # API calls and backend communication
│ ├── context/ # Global contexts (AuthContext, DeviceContext)
│ ├── types/ # TypeScript types and interfaces
│ ├── utils/ # Helper functions
│ ├── App.tsx # App entry point
│ ├── main.tsx # ReactDOM render
│ └── vite-env.d.ts
├── .env # Environment variables (API_URL, etc.)
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts

```

## ⚙️ Installation & Usage

### 1️⃣ Clone the repository

```bash

git clone https://github.com/matm89/Anoxion.git
cd anoxion

```
## 2️⃣ Install dependencies

```bash
npm install
# or
yarn install

```
## 3️⃣ Run in development mode
```bash
npm run dev
```

---
_README generated with ❤️ by [ChatGPT (GPT-5)](https://openai.com/chatgpt)_
