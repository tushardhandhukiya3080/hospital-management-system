# Test Cases
## Hospital Management System

Each test case maps to a Functional Requirement (FR) from the [SRS](01-SRS.md) for traceability.

| TC ID | FR | Title | Steps | Expected Result | Status |
|-------|----|-------|-------|-----------------|--------|
| TC-1 | FR-1 | Register user | Submit valid name/email/password/role | Account created, 201 | Pass |
| TC-2 | FR-1 | Register duplicate email | Register with an existing email | Error "email in use", 400 | Pass |
| TC-3 | FR-2,FR-3 | Login valid | Enter correct credentials | JWT returned, 200 | Pass |
| TC-4 | FR-2 | Login invalid | Enter wrong password | 401 Unauthorized | Pass |
| TC-5 | FR-4 | Role access control | Patient calls admin-only route | 403 Forbidden | Pass |
| TC-6 | FR-6,FR-7 | Register patient | Receptionist adds patient with details | Patient stored | Pass |
| TC-7 | FR-8 | Search patient | Search by name | Matching patients listed | Pass |
| TC-8 | FR-10 | Add doctor | Admin adds doctor with department | Doctor stored | Pass |
| TC-9 | FR-12 | List doctors by department | Open a department | Doctors of that dept shown | Pass |
| TC-10 | FR-13 | Book appointment | Pick doctor/date/free slot | Appointment created, 201 | Pass |
| TC-11 | FR-14 | Prevent double booking | Book same doctor+date+slot twice | 2nd attempt 409 Conflict | Pass |
| TC-12 | FR-16 | Cancel appointment | Cancel a booked appointment | Status = cancelled | Pass |
| TC-13 | FR-17 | Complete appointment | Doctor marks completed | Status = completed | Pass |
| TC-14 | FR-18,FR-19 | Write prescription | Doctor adds diagnosis+medicines | Prescription stored | Pass |
| TC-15 | FR-20 | Patient views prescription | Patient opens prescriptions | Own prescriptions listed | Pass |
| TC-16 | FR-21,FR-22 | Generate bill | Receptionist creates bill | Bill with total stored | Pass |
| TC-17 | FR-23 | View bill | Patient opens bills | Bills + status shown | Pass |
| TC-18 | FR-24 | Admin dashboard | Admin opens dashboard | Counts displayed | Pass |
| TC-19 | NFR-1 | Access without token | Call protected route, no JWT | 401 Unauthorized | Pass |
| TC-20 | NFR-4 | Input validation | Submit empty required field | 400 + clear message | Pass |

---

## How to run tests
- **Manual:** Follow the steps using the running app or Postman.
- **API (Postman):** Import the routes from `server/routes` and test each endpoint.
- Update the **Status** column with Pass/Fail and attach screenshots in your final report.
