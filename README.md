# 🚀 React Projects Showcase

A **React + TypeScript** learning playground that showcases small-to-mid size projects — each focusing on a specific React concept such as state management, component communication, hooks, side effects, and routing.

---

## 📘 Overview

This app serves as a **central hub** to browse, explore, and learn from mini React projects.  
Each project entry includes:

- **Project name, phase, and status**
- **Concepts covered**
- **Detailed “How to Implement” steps**
- A **Live Demo** link that loads dynamically under `/projects/:slug`

The goal: build and understand each React concept through practical, bite-sized projects.

---

## 🧱 Tech Stack

| Category        | Technology                               |
| --------------- | ---------------------------------------- |
| Frontend        | React 19 (Vite + TypeScript)             |
| Routing         | React Router v7                          |
| Styling         | Tailwind CSS                             |
| State           | React Hooks (useState, useEffect, etc.)  |
| Data            | Local data file (`src/data/projects.ts`) |
| Build Tool      | Vite                                     |
| Package Manager | npm or yarn                              |

---

## 📂 Folder Structure

```

src/
├── App.tsx
├── main.tsx
├── data/
│ └── projects.ts # Project data (id, name, slug, phase, status, steps, etc.)
├── pages/
│ ├── Home.tsx # Displays all projects in a table
│ ├── ProjectDetail.tsx # Shows project details and implementation steps
│ └── projects/
│ ├── ProjectDemoLoader.tsx # Dynamically loads live demo component based on slug
│ ├── accordion/ # Example project folder
│ │ ├── Accordion.tsx
│ │ └── AccordionItem.tsx
│ └── ...other-projects/
└── index.css # Tailwind entry point

```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/sajankota/react-projects.git
cd react-projects
```

### 2️⃣ Install Dependencies

```bash
npm install
# or
yarn install
```

### 3️⃣ Start the Development Server

```bash
npm run dev
```

This starts the app on [http://localhost:5173](http://localhost:5173)

---

## 🧭 Routing Overview

| Route             | Description                       |
| ----------------- | --------------------------------- |
| `/`               | Home page showing all projects    |
| `/project/:slug`  | Project details page (slug-based) |
| `/projects/:slug` | Live demo page for the project    |

Example:

```
/project/accordion      → Shows Accordion details and steps
/projects/accordion     → Loads the live Accordion demo
```

---

## 🧩 How Projects Work

Each project is defined in `src/data/projects.ts` like this:

```ts
{
  id: 1,
  name: "Accordion Component",
  slug: "accordion",
  phase: "UI Components",
  status: "Completed",
  concepts: "useState, Props, Component Composition",
  steps: [
    "Create Accordion and AccordionItem components.",
    "Use useState to manage open/close.",
    "Pass title and content via props.",
    "Add Tailwind for styling."
  ]
}
```

The **slug** field maps directly to a folder under `/src/pages/projects/` for dynamic imports.

---

## 🌐 Live Demo (Optional)

If deployed, the app can be hosted on:

- **Vercel**
- **Netlify**
- **GitHub Pages** (with Vite config adjustments)

---

## 🧠 Learning Goal

This project helps you:

- Practice **React concepts** through small, isolated apps.
- Learn **clean component design** and **state management patterns**.
- Understand **routing and dynamic imports**.
- Improve **UI skills with Tailwind CSS**.
- Build confidence for **mid-level React developer interviews**.

---

## 🛠️ Future Improvements

- Add **search and filters** on the homepage.
- Include **code previews** for each project.
- Implement **tags and difficulty levels**.
- Add **dark mode** support.
- Integrate **Redux Toolkit** for state management demos.

---

## 🧑‍💻 Author

**Sajan Kota**
Focused on React, Node.js, and modern web development.

---

## 📜 License

This project is open-source under the **MIT License**.
