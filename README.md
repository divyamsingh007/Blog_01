# Blog Portfolio Monorepo 🖋️

This project is a modern blog portal featuring a React/Vite frontend and an Express/Node.js backend.

## Project Structure

- **/frontend**: React application (Vite, Tailwind CSS, Framer Motion)
- **/backend**: Express API (Node.js, Mongoose/MongoDB)

## Getting Started

### 1. Installation
To install all dependencies for both the frontend and backend at once, run the following command in the **root** directory:

```bash
npm run install:all
```

### 2. Running in Development
You can start both the frontend and backend development servers simultaneously with a single command from the **root** directory:

```bash
npm run dev
```

- **Frontend**: Typically runs at `http://localhost:5173`
- **Backend (API)**: typically runs at `http://localhost:5000`

### 3. Other Useful Commands (Root)
- `npm run build:frontend`: Build the React app for production.
- `npm run start`: Build the frontend and start the backend server.
- `npm run dev:frontend`: Start only the frontend dev server.
- `npm run dev:backend`: Start only the backend dev server.

---
Crafted with ❤️ by Antigravity.
