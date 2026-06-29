# Setup & Run Guide
## Hospital Management System (MERN)

This guide gets the project running on a fresh machine (Windows/Mac/Linux).

---

## 1. Prerequisites

Install these once:

| Tool | Version | Download |
|------|---------|----------|
| Node.js | 18+ | https://nodejs.org |
| MongoDB | 6+ (local) **or** a free MongoDB Atlas cloud account | https://www.mongodb.com/try/download/community or https://www.mongodb.com/atlas |
| Git | any | https://git-scm.com |

Check Node is installed:
```bash
node -v
npm -v
```

---

## 2. Get MongoDB running

**Option A — Local MongoDB:** install MongoDB Community Server. It runs at
`mongodb://127.0.0.1:27017` by default. Nothing else to do.

**Option B — MongoDB Atlas (cloud, no install):**
1. Create a free cluster at https://www.mongodb.com/atlas
2. Create a database user + password.
3. Allow network access from your IP (or 0.0.0.0/0 for testing).
4. Copy the connection string — it looks like
   `mongodb+srv://USER:PASS@cluster0.xxxx.mongodb.net/hms`

---

## 3. Backend Setup (`server/`)

```bash
cd server
npm install
```

Create the `.env` file (copy from the example):
```bash
# Windows PowerShell
copy .env.example .env
# Mac/Linux
cp .env.example .env
```

Edit `.env` and set values:
```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/hms      # or your Atlas string
JWT_SECRET=put_a_long_random_string_here
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

Seed sample data (creates one of each user role):
```bash
npm run seed
```

Start the backend:
```bash
npm run dev      # auto-restarts on changes
# or
npm start
```
You should see `🚀 Server running on http://localhost:5000`.
Test it: open http://localhost:5000/api/health → `{"status":"ok"}`.

---

## 4. Frontend Setup (`client/`)

Open a **new terminal**:
```bash
cd client
npm install
```

Create `.env`:
```bash
copy .env.example .env     # Windows
cp .env.example .env       # Mac/Linux
```
Contents:
```
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:
```bash
npm run dev
```
Open the printed URL (usually http://localhost:5173).

---

## 5. Login Credentials (after seeding)

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@hms.com | admin123 |
| Receptionist | reception@hms.com | reception123 |
| Doctor | doctor@hms.com | doctor123 |
| Patient | patient@hms.com | patient123 |

> New patients can also self-register from the Register page.

---

## 6. Demo Flow (good for your viva/presentation)

1. **Admin** logs in → Dashboard shows counts → adds a Department and a Doctor.
2. **Receptionist** logs in → registers a Patient → books an Appointment.
3. **Patient** logs in → sees their appointment, can book another.
4. **Doctor** logs in → sees the appointment → writes a Prescription (auto-completes it).
5. **Receptionist** generates a Bill → marks it Paid.
6. **Patient** views their Prescription and Bill.

This flow demonstrates every functional requirement (FR-1 to FR-24).

---

## 7. Troubleshooting

| Problem | Fix |
|---------|-----|
| `MongoDB connection error` | Make sure MongoDB is running, or the Atlas URI/password is correct. |
| `CORS` error in browser | Ensure `CLIENT_URL` in server `.env` matches the frontend URL. |
| `401 Unauthorized` everywhere | Token expired — log out and log in again. |
| Port already in use | Change `PORT` (server) or Vite port in `vite.config.js`. |
| Frontend can't reach API | Check `VITE_API_URL` and that the backend is running. |

---

## 8. Building for Submission

- Backend and frontend run separately during development.
- For a production build of the frontend: `cd client && npm run build` → output in `client/dist`.
- Push to GitHub (the `.gitignore` files exclude `node_modules` and `.env`).
