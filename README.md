# Hospital Management System (HMS)

A full-stack **MERN** (MongoDB, Express, React, Node.js) Hospital Management System built as a
final-year **Software Engineering** project.

This repository contains **both** the engineering documents (SRS, diagrams) and the working
application code, so it can be submitted as a complete SE project.

---

## 1. Project Overview

The Hospital Management System digitizes the day-to-day operations of a hospital: patient
registration, doctor management, appointment booking, prescriptions, and billing. It replaces
manual, paper-based record keeping with a secure, role-based web application.

### Actors (Roles)
| Role | Responsibilities |
|------|------------------|
| **Admin** | Manage doctors, departments, view all data, generate reports |
| **Doctor** | View their appointments, write prescriptions, view patient history |
| **Receptionist** | Register patients, book/cancel appointments, generate bills |
| **Patient** | Register, book appointments, view prescriptions & bills |

---

## 2. Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React (Vite), React Router, Axios |
| Backend | Node.js, Express |
| Database | MongoDB (Mongoose ODM) |
| Auth | JWT (JSON Web Tokens) + bcrypt password hashing |
| Styling | Plain CSS (can be swapped for Tailwind/Bootstrap) |

---

## 3. Team & Suggested Work Split (2–3 members)

| Member | Owns |
|--------|------|
| **Member 1 – Backend** | Express API, models, auth, database |
| **Member 2 – Frontend** | React pages, components, API integration |
| **Member 3 – Docs & Testing** | SRS, diagrams, test cases, deployment, demo |

> With 2 members, combine Docs/Testing into both roles.

---

## 4. Repository Structure

```
Hospital-Management-System/
├── docs/                  # Software Engineering deliverables
│   ├── 01-SRS.md
│   ├── 02-use-case.md
│   ├── 03-er-diagram.md
│   ├── 04-class-sequence-diagrams.md
│   └── 05-test-cases.md
├── server/                # Express + MongoDB backend
├── client/                # React frontend
└── README.md
```

---

## 5. Quick Start

See [docs/SETUP.md](docs/SETUP.md) for full instructions. Short version:

```bash
# Backend
cd server
npm install
cp .env.example .env      # then edit values
npm run dev

# Frontend (new terminal)
cd client
npm install
npm run dev
```

---

## 6. SE Deliverables Checklist

- [x] Software Requirements Specification (SRS)
- [x] Use-case diagram + descriptions
- [x] ER diagram + data dictionary
- [x] Class diagram
- [x] Sequence diagrams
- [x] Test cases
- [x] Working full-stack application
