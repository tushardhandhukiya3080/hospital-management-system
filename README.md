# MediFind India — Doctor Directory

A full-stack **MERN** web application to **find doctors across India** by specialty,
city and state — with their qualifications and contact details. Built as a
final-year **Software Engineering** project.

> Note: the GitHub repo is still named `hospital-management-system` (the project's
> earlier scope). The codebase is now a doctor directory.

---

## 1. Features

**Public site**
- Search doctors by name, specialty or hospital
- Filter by **specialty**, **state** and **city**
- Paginated result grid of doctor cards
- Doctor profile pages with qualifications, languages, experience, fees and contact details

**Admin panel** (login required)
- Add, edit and delete doctors
- Role-based access (admin only) protected by JWT

---

## 2. Tech Stack
| Layer | Technology |
|-------|-----------|
| Frontend | React (Vite), React Router, Axios |
| Backend | Node.js, Express |
| Database | MongoDB (Mongoose) |
| Auth | JWT + bcrypt |

---

## 3. Data
The app is seeded with **fictional sample data** (~54 doctors across 13 states and
18 specialties). Names, phone numbers and emails are placeholders and do **not**
refer to real people. Admins can add real entries through the admin panel.

---

## 4. Project Structure
```
├── server/                # Express + MongoDB API
│   └── src/
│       ├── models/        # Doctor, User
│       ├── controllers/   # doctor, auth
│       ├── routes/        # /api/doctors, /api/auth
│       └── seed.js        # sample data
├── client/                # React app
│   └── src/
│       ├── pages/         # Home, DoctorDetail, Login, Admin
│       └── components/    # Navbar, DoctorCard, ...
└── docs/                  # Software Engineering documents
```

---

## 5. Quick Start

**Prerequisites:** Node.js 18+, MongoDB running locally (or a MongoDB Atlas URI).

```bash
# Backend
cd server
npm install
cp .env.example .env        # set MONGO_URI and JWT_SECRET
npm run seed                # load sample doctors + admin
npm run dev                 # http://localhost:5000

# Frontend (new terminal)
cd client
npm install
cp .env.example .env
npm run dev                 # http://localhost:5173
```

**Admin login:** `admin@medifind.in` / `admin123`

---

## 6. API Overview
| Method | Endpoint | Access | Purpose |
|--------|----------|--------|---------|
| GET | `/api/doctors` | Public | List with `search`, `specialty`, `state`, `city`, `page` |
| GET | `/api/doctors/meta` | Public | Distinct states/cities/specialties for filters |
| GET | `/api/doctors/:id` | Public | Single doctor profile |
| POST | `/api/doctors` | Admin | Create a doctor |
| PUT | `/api/doctors/:id` | Admin | Update a doctor |
| DELETE | `/api/doctors/:id` | Admin | Delete a doctor |
| POST | `/api/auth/login` | Public | Admin sign-in (returns JWT) |
