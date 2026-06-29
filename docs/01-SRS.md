# Software Requirements Specification (SRS)
## Hospital Management System (HMS)

**Version:** 1.0
**Date:** 2026-06-29
**Prepared for:** Software Engineering Course Project

---

## 1. Introduction

### 1.1 Purpose
This document specifies the software requirements for the **Hospital Management System (HMS)**,
a web-based application to manage patients, doctors, appointments, prescriptions, and billing.
It is intended for the development team, evaluators, and future maintainers.

### 1.2 Scope
HMS is a role-based web application that allows:
- Patients to register and book appointments online.
- Receptionists to manage patient records and appointments.
- Doctors to view appointments and issue prescriptions.
- Admins to manage the hospital's doctors, departments, and view reports.

The system is **out of scope** for: insurance claim processing, pharmacy stock automation,
lab equipment integration, and real-time video consultation.

### 1.3 Definitions, Acronyms, Abbreviations
| Term | Meaning |
|------|---------|
| HMS | Hospital Management System |
| SRS | Software Requirements Specification |
| JWT | JSON Web Token |
| CRUD | Create, Read, Update, Delete |
| UI | User Interface |

### 1.4 References
- IEEE Std 830-1998, Recommended Practice for Software Requirements Specifications.

---

## 2. Overall Description

### 2.1 Product Perspective
HMS is a new, self-contained product. It follows a 3-tier architecture:
1. **Presentation tier** – React single-page application.
2. **Application tier** – Express REST API.
3. **Data tier** – MongoDB database.

### 2.2 Product Functions (high level)
- User authentication and role-based access control.
- Patient registration and record management.
- Doctor and department management.
- Appointment booking, viewing, and cancellation.
- Prescription creation and viewing.
- Billing generation and viewing.
- Administrative reporting.

### 2.3 User Classes and Characteristics
| User Class | Technical Skill | Frequency of Use |
|------------|-----------------|------------------|
| Admin | High | Daily |
| Doctor | Medium | Daily |
| Receptionist | Medium | Continuous (work hours) |
| Patient | Low | Occasional |

### 2.4 Operating Environment
- Client: Any modern web browser (Chrome, Edge, Firefox).
- Server: Node.js runtime on Windows/Linux.
- Database: MongoDB (local or Atlas cloud).

### 2.5 Design and Implementation Constraints
- Must be built using the MERN stack.
- Passwords must be stored hashed (bcrypt).
- Authentication via JWT.
- REST API conventions.

### 2.6 Assumptions and Dependencies
- Users have internet access and a modern browser.
- A running MongoDB instance is available.

---

## 3. Functional Requirements

> Each requirement has a unique ID for traceability to test cases.

### 3.1 Authentication & Authorization
| ID | Requirement |
|----|-------------|
| FR-1 | The system shall allow a user to register with name, email, password, and role. |
| FR-2 | The system shall authenticate users via email and password. |
| FR-3 | The system shall issue a JWT on successful login. |
| FR-4 | The system shall restrict access to features based on the user's role. |
| FR-5 | The system shall allow a logged-in user to log out. |

### 3.2 Patient Management
| ID | Requirement |
|----|-------------|
| FR-6 | The receptionist/admin shall be able to register a new patient. |
| FR-7 | The system shall store patient name, age, gender, phone, and address. |
| FR-8 | Staff shall be able to view, search, update, and delete patient records. |
| FR-9 | A patient shall be able to view their own profile. |

### 3.3 Doctor & Department Management
| ID | Requirement |
|----|-------------|
| FR-10 | The admin shall be able to add, update, and remove doctors. |
| FR-11 | Each doctor shall belong to a department and have a specialization. |
| FR-12 | The system shall list available doctors by department. |

### 3.4 Appointment Management
| ID | Requirement |
|----|-------------|
| FR-13 | A patient/receptionist shall book an appointment with a doctor for a date and time. |
| FR-14 | The system shall prevent double-booking the same doctor at the same time slot. |
| FR-15 | Users shall be able to view appointments relevant to their role. |
| FR-16 | A patient/receptionist shall be able to cancel an appointment. |
| FR-17 | A doctor shall be able to mark an appointment as completed. |

### 3.5 Prescription Management
| ID | Requirement |
|----|-------------|
| FR-18 | A doctor shall create a prescription linked to an appointment. |
| FR-19 | A prescription shall include diagnosis, medicines, and notes. |
| FR-20 | A patient shall be able to view their prescriptions. |

### 3.6 Billing
| ID | Requirement |
|----|-------------|
| FR-21 | The receptionist shall generate a bill for an appointment. |
| FR-22 | A bill shall include itemized charges and a total amount. |
| FR-23 | A patient shall be able to view their bills and payment status. |

### 3.7 Reporting (Admin)
| ID | Requirement |
|----|-------------|
| FR-24 | The admin shall view counts of patients, doctors, and appointments (dashboard). |

---

## 4. Non-Functional Requirements

| ID | Category | Requirement |
|----|----------|-------------|
| NFR-1 | Security | Passwords shall be hashed; protected routes shall require a valid JWT. |
| NFR-2 | Performance | A typical API request shall respond within 2 seconds under normal load. |
| NFR-3 | Usability | The UI shall be responsive and usable on desktop and tablet. |
| NFR-4 | Reliability | The system shall validate all inputs and return clear error messages. |
| NFR-5 | Maintainability | Code shall be modular (separate models, routes, controllers). |
| NFR-6 | Portability | The app shall run on Windows and Linux with Node.js installed. |
| NFR-7 | Scalability | The database schema shall support growth via indexed references. |

---

## 5. Requirement Traceability (summary)
Each FR above is verified by a corresponding test case in
[05-test-cases.md](05-test-cases.md). The mapping is maintained in that document.
