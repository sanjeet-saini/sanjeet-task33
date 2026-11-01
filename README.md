# To-Do List App — Full Stack (Node.js + Express + MongoDB + React)

A full-stack To-Do List application built with:

- **Backend**: Node.js, Express.js, MongoDB (Mongoose)
- **Frontend**: React 18, Axios

---

## Project Structure

```
sanjeet-task-33/
├── backend/
│   ├── src/
│   │   ├── config/db.js          # MongoDB connection
│   │   ├── models/Task.js        # Mongoose Task model
│   │   ├── controllers/taskController.js
│   │   ├── middleware/validate.js
│   │   ├── routes/taskRoutes.js
│   │   └── index.js              # Entry point
│   ├── .env.example
│   └── package.json
└── frontend/
    ├── src/
    │   ├── services/api.js       # Axios API service
    │   ├── hooks/useTasks.js     # Custom hook for task state
    │   ├── components/
    │   │   ├── TaskCard.jsx
    │   │   ├── TaskForm.jsx
    │   │   └── TaskFilters.jsx
    │   ├── App.jsx
    │   └── index.js
    ├── public/index.html
    ├── .env.example
    └── package.json
```

---

## Setup & Running Locally

### Prerequisites

- Node.js v18+
- MongoDB running locally on port 27017 **or** a MongoDB Atlas URI

### 1. Backend

```bash
cd backend
cp .env.example .env          # Edit MONGODB_URI if needed
npm install
npm run dev                   # Runs on http://localhost:5000
```

### 2. Frontend

```bash
cd frontend
cp .env.example .env          # Adjust REACT_APP_API_URL if backend is on a different host
npm install
npm start                     # Runs on http://localhost:3000
```

---

## Environment Variables

### Backend (`backend/.env`)

| Variable | Default | Description |
|---|---|---|
| `PORT` | `5000` | Server port |
| `MONGODB_URI` | `mongodb://localhost:27017/todo_db` | MongoDB connection string |
| `NODE_ENV` | `development` | Environment |

### Frontend (`frontend/.env`)

| Variable | Default | Description |
|---|---|---|
| `REACT_APP_API_URL` | `/api/tasks` (proxied) | Backend API base URL |

When running locally with `"proxy": "http://localhost:5000"` in `package.json`, you can leave `REACT_APP_API_URL` unset.

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/tasks` | List tasks (supports `search`, `status`, `priority`, `page`, `limit`) |
| GET | `/api/tasks/:id` | Get a single task |
| POST | `/api/tasks` | Create a task |
| PUT | `/api/tasks/:id` | Update a task |
| PATCH | `/api/tasks/:id/status` | Update task status only |
| DELETE | `/api/tasks/:id` | Delete a task |

---

## Features

- Create, read, update, delete tasks
- Filter by status (`pending`, `in-progress`, `completed`) and priority (`low`, `medium`, `high`)
- Full-text search on title and description
- Inline status update from the task card
- Loading indicators and error messages
- Toast notifications for all actions
- Responsive grid layout

---

## Hosting

- **Backend**: Deploy to [Render](https://render.com) — set the `MONGODB_URI` env var to your Atlas URI.
- **Frontend**: Deploy to [Netlify](https://netlify.com) — set `REACT_APP_API_URL` to your Render backend URL and run `npm run build`.

---

## Challenges & Solutions

| Challenge | Solution |
|---|---|
| CORS between React dev server and Express | Added `cors()` middleware on the backend; `"proxy"` field in `package.json` for local dev |
| MongoDB text search requiring an index | Added `taskSchema.index({ title: 'text', description: 'text' })` |
| Async error propagation in Express | Wrapped each controller call in an `asyncHandler` HOF so errors reach the global error handler |
| Keeping UI in sync after status updates | Custom `useTasks` hook updates local state optimistically then re-syncs from server |
