# Class & Sequence Diagrams
## Hospital Management System

> Mermaid diagrams. Export via https://mermaid.live for your report.

---

## 1. Class Diagram

```mermaid
classDiagram
    class User {
        +ObjectId id
        +String name
        +String email
        +String passwordHash
        +String role
        +register()
        +login()
        +comparePassword(plain) bool
    }

    class Patient {
        +int age
        +String gender
        +String phone
        +String address
        +viewProfile()
        +bookAppointment()
        +viewPrescriptions()
        +viewBills()
    }

    class Doctor {
        +String specialization
        +decimal consultationFee
        +viewAppointments()
        +writePrescription()
        +completeAppointment()
    }

    class Department {
        +String name
        +String description
        +listDoctors()
    }

    class Appointment {
        +Date date
        +String timeSlot
        +String status
        +String reason
        +book()
        +cancel()
        +complete()
    }

    class Prescription {
        +String diagnosis
        +String medicines
        +String notes
        +create()
    }

    class Bill {
        +decimal totalAmount
        +String status
        +generate()
        +markPaid()
    }

    User <|-- Patient
    User <|-- Doctor
    Department "1" o-- "many" Doctor
    Patient "1" --> "many" Appointment
    Doctor "1" --> "many" Appointment
    Appointment "1" --> "0..1" Prescription
    Appointment "1" --> "0..1" Bill
```

---

## 2. Sequence Diagram — Book Appointment (UC-4)

```mermaid
sequenceDiagram
    actor P as Patient
    participant UI as React UI
    participant API as Express API
    participant DB as MongoDB

    P->>UI: Select doctor, date, time slot
    UI->>API: POST /api/appointments (JWT)
    API->>API: Verify JWT & role
    API->>DB: Find appointment(doctorId, date, slot)
    DB-->>API: result
    alt Slot is free
        API->>DB: Insert new appointment (status=booked)
        DB-->>API: saved appointment
        API-->>UI: 201 Created
        UI-->>P: Show confirmation
    else Slot taken
        API-->>UI: 409 Conflict
        UI-->>P: Show "slot unavailable"
    end
```

---

## 3. Sequence Diagram — Write Prescription (UC-7)

```mermaid
sequenceDiagram
    actor D as Doctor
    participant UI as React UI
    participant API as Express API
    participant DB as MongoDB

    D->>UI: Open appointment, enter diagnosis & medicines
    UI->>API: POST /api/prescriptions (JWT)
    API->>API: Verify role == doctor
    API->>DB: Insert prescription (link appointment, patient)
    DB-->>API: saved
    API->>DB: Update appointment status = completed
    DB-->>API: ok
    API-->>UI: 201 Created
    UI-->>D: Show success
```

---

## 4. Sequence Diagram — Login (UC-1)

```mermaid
sequenceDiagram
    actor U as User
    participant UI as React UI
    participant API as Express API
    participant DB as MongoDB

    U->>UI: Enter email & password
    UI->>API: POST /api/auth/login
    API->>DB: Find user by email
    DB-->>API: user record
    API->>API: bcrypt.compare(password, hash)
    alt Valid
        API->>API: Sign JWT
        API-->>UI: 200 + token + role
        UI-->>U: Redirect to role dashboard
    else Invalid
        API-->>UI: 401 Unauthorized
        UI-->>U: Show error
    end
```
