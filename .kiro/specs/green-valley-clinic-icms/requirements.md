# Requirements Document

## Introduction

The Green Valley Clinic Integrated Clinic Management System (ICMS) is a fully interactive, high-fidelity web application prototype built with React, Tailwind CSS, and shadcn/ui. It consists of two primary surfaces: an Internal Staff Dashboard used by receptionists, doctors, and admins; and a Public Website / Patient Portal accessible to patients. All data is managed via React state, Context API, and localStorage — no backend is required. The system simulates real clinic workflows including appointment booking, patient record management, staff management, and reporting.

## Glossary

- **ICMS**: Integrated Clinic Management System — the full application described in this document.
- **Staff_Dashboard**: The internal-facing application surface used by clinic staff (receptionist, doctor, admin).
- **Patient_Portal**: The public-facing application surface used by patients to book appointments, view health resources, and manage their profile.
- **Appointment_Engine**: The module responsible for appointment creation, slot availability, conflict detection, and status management.
- **Mock_Store**: The in-memory and localStorage-backed data layer that simulates a backend database.
- **Auth_Module**: The authentication module that manages login, registration, role assignment, and session persistence.
- **Notification_System**: The toast and alert feedback system that provides real-time UI feedback to users.
- **Breadcrumb_Nav**: The desktop breadcrumb navigation component showing the current page hierarchy with clickable segments.
- **Bottom_Nav**: The mobile fixed bottom navigation bar with icons and labels for key routes.
- **Role**: A user classification — one of: `admin`, `doctor`, `receptionist`, or `patient`.
- **Slot**: A specific date + time combination available for a doctor's appointment.
- **Patient_Record**: A structured data object containing a patient's personal info, medical history, and appointment history.

---

## Requirements

### Requirement 1: Application Bootstrap and Mock Data Initialization

**User Story:** As a developer, I want the application to initialize with realistic mock data on first load, so that the prototype behaves like a real system from the moment it opens.

#### Acceptance Criteria

1. WHEN the application loads for the first time, THE Mock_Store SHALL seed localStorage with at least 10 patients, 5 doctors, 3 staff users, and 20 appointments spanning past and future dates.
2. WHEN the application loads on subsequent visits, THE Mock_Store SHALL read persisted data from localStorage instead of re-seeding.
3. THE Mock_Store SHALL expose Create, Read, Update, and Delete operations for patients, appointments, doctors, and staff records.
4. WHEN a CRUD operation is performed, THE Mock_Store SHALL persist the updated state to localStorage within 100ms.

---

### Requirement 2: Authentication and Role-Based Access

**User Story:** As a clinic staff member or patient, I want to log in with my credentials and be directed to the correct interface, so that I can access only the features relevant to my role.

#### Acceptance Criteria

1. WHEN a user submits valid credentials on the login form, THE Auth_Module SHALL authenticate the user, store the session in localStorage, and redirect to the role-appropriate dashboard within 500ms.
2. WHEN a user submits invalid credentials, THE Auth_Module SHALL display an inline error message without clearing the email field.
3. THE Auth_Module SHALL support four roles: `admin`, `doctor`, `receptionist`, and `patient`.
4. WHILE a user session is active, THE Auth_Module SHALL persist the session across page refreshes.
5. WHEN a user clicks the logout button, THE Auth_Module SHALL clear the session from localStorage and redirect to the login page.
6. WHEN an unauthenticated user attempts to access a protected route, THE Auth_Module SHALL redirect to the login page.
7. WHERE the role is `admin`, THE Staff_Dashboard SHALL display all modules including Staff Management and Reports.
8. WHERE the role is `doctor`, THE Staff_Dashboard SHALL display Appointments and Patient Records modules only.
9. WHERE the role is `receptionist`, THE Staff_Dashboard SHALL display Appointments and Patient Records modules only.

---

### Requirement 3: Staff Dashboard — Layout and Navigation

**User Story:** As a staff member, I want a consistent, professional dashboard layout with clear navigation, so that I can move between modules efficiently.

#### Acceptance Criteria

1. THE Staff_Dashboard SHALL render a collapsible sidebar on desktop viewports (≥1024px) containing navigation links for all role-permitted modules.
2. WHEN a sidebar navigation link is clicked, THE Staff_Dashboard SHALL render the corresponding module view without a full page reload.
3. THE Breadcrumb_Nav SHALL render on all Staff_Dashboard pages showing the full path from root to current page (e.g., "Dashboard > Patients > Edit Patient").
4. WHEN a breadcrumb segment is clicked, THE Breadcrumb_Nav SHALL navigate to the corresponding page.
5. WHILE the viewport width is less than 1024px, THE Bottom_Nav SHALL render as a fixed bottom bar with icons and labels for the top 5 key routes.
6. WHEN a Bottom_Nav item is tapped, THE Bottom_Nav SHALL navigate to the corresponding route and highlight the active item.
7. THE Staff_Dashboard SHALL display the logged-in user's name and role in the sidebar header.

---

### Requirement 4: Staff Dashboard — Overview / Stats Dashboard

**User Story:** As a staff member, I want to see a real-time overview of clinic activity on the dashboard home, so that I can quickly assess the current state of the clinic.

#### Acceptance Criteria

1. THE Staff_Dashboard SHALL display stat cards showing: Total Patients, Today's Appointments, Pending Appointments, and Active Doctors.
2. WHEN a CRUD operation changes patient or appointment data, THE Staff_Dashboard stat cards SHALL update to reflect the new counts without a page reload.
3. THE Staff_Dashboard SHALL display a list of today's upcoming appointments sorted by time.
4. THE Staff_Dashboard SHALL display a recent activity feed showing the last 10 data changes (e.g., "New patient registered", "Appointment confirmed").

---

### Requirement 5: Appointment Management Module

**User Story:** As a receptionist or admin, I want to create, view, update, and cancel appointments, so that the clinic schedule is always accurate.

#### Acceptance Criteria

1. THE Appointment_Engine SHALL display all appointments in a searchable, filterable data table with columns: Patient Name, Doctor, Date, Time, Status.
2. WHEN a staff member searches the appointments table, THE Appointment_Engine SHALL filter rows in real time as the user types.
3. WHEN a staff member selects a doctor and date, THE Appointment_Engine SHALL display only the available time slots for that doctor on that date.
4. IF a selected time slot is already booked, THEN THE Appointment_Engine SHALL mark the slot as unavailable and prevent selection.
5. WHEN a new appointment is submitted via the booking form, THE Appointment_Engine SHALL validate all required fields, save the appointment to the Mock_Store, and display a success toast notification.
6. WHEN an appointment status is changed (e.g., Confirmed → Completed), THE Appointment_Engine SHALL update the record in the Mock_Store and reflect the change in the table immediately.
7. WHEN a staff member cancels an appointment, THE Appointment_Engine SHALL prompt for confirmation via a dialog before deleting the record.
8. THE Appointment_Engine SHALL support filtering appointments by status: All, Pending, Confirmed, Completed, Cancelled.

---

### Requirement 6: Patient Records Module

**User Story:** As a doctor or receptionist, I want to view and manage patient records, so that I have accurate information during consultations and check-ins.

#### Acceptance Criteria

1. THE Staff_Dashboard SHALL display all patients in a searchable data table with columns: Name, Age, Gender, Contact, Last Visit.
2. WHEN a staff member clicks a patient row, THE Staff_Dashboard SHALL open a patient detail view showing personal info, medical history, and appointment history.
3. WHEN a staff member submits the new patient form with valid data, THE Mock_Store SHALL create a new patient record and the table SHALL update immediately.
4. IF a required field in the patient form is empty on submission, THEN THE Staff_Dashboard SHALL display an inline validation error beneath the field.
5. WHEN a staff member edits a patient record and submits, THE Mock_Store SHALL update the record and display a success toast.
6. WHEN a staff member deletes a patient record, THE Staff_Dashboard SHALL prompt for confirmation before removing the record from the Mock_Store.

---

### Requirement 7: Staff Management Module (Admin Only)

**User Story:** As an admin, I want to manage clinic staff accounts, so that I can control who has access to the system and in what role.

#### Acceptance Criteria

1. WHERE the role is `admin`, THE Staff_Dashboard SHALL display a staff management table listing all staff with columns: Name, Role, Email, Status.
2. WHEN an admin submits the add staff form with valid data, THE Mock_Store SHALL create a new staff record and the table SHALL update immediately.
3. WHEN an admin changes a staff member's role, THE Mock_Store SHALL update the record and display a success toast.
4. WHEN an admin deactivates a staff account, THE Auth_Module SHALL prevent that account from logging in.
5. IF a required field in the staff form is empty on submission, THEN THE Staff_Dashboard SHALL display an inline validation error beneath the field.

---

### Requirement 8: Reports Module (Admin Only)

**User Story:** As an admin, I want to view summary reports of clinic activity, so that I can make informed operational decisions.

#### Acceptance Criteria

1. WHERE the role is `admin`, THE Staff_Dashboard SHALL display a Reports page with summary statistics: total appointments by status, new patients per month, and doctor workload.
2. THE Staff_Dashboard SHALL render the report data as visual charts (bar or pie) using a lightweight charting approach.
3. WHEN the admin selects a date range filter, THE Staff_Dashboard SHALL recalculate and re-render the report data for that range.

---

### Requirement 9: Public Website — Layout and Navigation

**User Story:** As a visitor or patient, I want a professional public website with clear navigation, so that I can learn about the clinic and access patient services.

#### Acceptance Criteria

1. THE Patient_Portal SHALL render a top navigation bar on all public pages with links to: Home, Services, Doctors, Book Appointment, Contact, and Login/Register.
2. WHEN a navigation link is clicked, THE Patient_Portal SHALL navigate to the corresponding page.
3. WHILE the viewport width is less than 768px, THE Patient_Portal SHALL replace the top navbar with a hamburger menu that opens a full-screen or slide-in mobile menu.
4. THE Patient_Portal SHALL apply the clinic color palette: primary green `#A8D98A`, light green/cream `#F0F9D4`, warm cream/beige `#E8DFC8`, and deep navy `#1E2A6E` consistently across all public pages.

---

### Requirement 10: Public Website — Homepage

**User Story:** As a visitor, I want an engaging homepage that communicates the clinic's value, so that I feel confident booking an appointment.

#### Acceptance Criteria

1. THE Patient_Portal homepage SHALL render a hero section with a headline, subheadline, and a "Book Appointment" call-to-action button.
2. WHEN the "Book Appointment" CTA is clicked, THE Patient_Portal SHALL navigate to the appointment booking page.
3. THE Patient_Portal homepage SHALL display a services overview section listing at least 4 clinic services with icons and descriptions.
4. THE Patient_Portal homepage SHALL display a featured doctors section showing at least 3 doctor cards with name, specialty, and a "Book" button.
5. WHEN a doctor "Book" button is clicked, THE Patient_Portal SHALL navigate to the booking page with that doctor pre-selected.

---

### Requirement 11: Public Website — Services and Doctors Pages

**User Story:** As a patient, I want to browse available services and doctors, so that I can choose the right care for my needs.

#### Acceptance Criteria

1. THE Patient_Portal Services page SHALL list all clinic services with name, description, and associated doctor(s).
2. THE Patient_Portal Doctors page SHALL display all doctors with name, specialty, bio, and availability status.
3. WHEN a patient clicks a doctor card, THE Patient_Portal SHALL display a doctor detail modal or page with full profile and a "Book Appointment" button.

---

### Requirement 12: Public Website — Appointment Booking Flow

**User Story:** As a patient, I want to book an appointment online in a guided multi-step flow, so that I can schedule care without calling the clinic.

#### Acceptance Criteria

1. THE Patient_Portal booking flow SHALL consist of at least three steps: (1) Select Doctor & Service, (2) Select Date & Time, (3) Confirm & Submit.
2. WHEN a patient selects a doctor and date, THE Appointment_Engine SHALL display only available time slots for that doctor on that date.
3. IF a patient attempts to proceed to the next step without completing required fields, THEN THE Patient_Portal SHALL display inline validation errors and prevent progression.
4. WHEN a patient submits the booking form, THE Appointment_Engine SHALL save the appointment to the Mock_Store with status `Pending` and display a confirmation summary with a booking reference number.
5. IF the selected slot becomes unavailable between selection and submission, THEN THE Appointment_Engine SHALL display an error and prompt the patient to select a new slot.

---

### Requirement 13: Public Website — Patient Registration and Login

**User Story:** As a new patient, I want to register an account, so that I can manage my appointments and health information online.

#### Acceptance Criteria

1. THE Patient_Portal registration form SHALL collect: full name, email, password, date of birth, and phone number.
2. WHEN a patient submits the registration form with valid data, THE Auth_Module SHALL create a patient account in the Mock_Store and redirect to the patient dashboard.
3. IF the email provided during registration already exists in the Mock_Store, THEN THE Auth_Module SHALL display an inline error: "An account with this email already exists."
4. THE Patient_Portal login form SHALL validate email format and require a non-empty password before submission.
5. WHEN a registered patient logs in successfully, THE Auth_Module SHALL redirect to the patient dashboard.

---

### Requirement 14: Patient Portal — Patient Dashboard

**User Story:** As a logged-in patient, I want a personal dashboard showing my appointments and profile, so that I can manage my healthcare online.

#### Acceptance Criteria

1. WHILE a patient is logged in, THE Patient_Portal SHALL display a patient dashboard with: upcoming appointments, past appointments, and profile summary.
2. WHEN a patient cancels an upcoming appointment from the dashboard, THE Appointment_Engine SHALL update the appointment status to `Cancelled` in the Mock_Store and reflect the change immediately.
3. WHEN a patient clicks "Book New Appointment" from the dashboard, THE Patient_Portal SHALL navigate to the booking flow.
4. WHEN a patient updates their profile information and submits, THE Mock_Store SHALL update the patient record and display a success toast.

---

### Requirement 15: Public Website — Contact Page

**User Story:** As a visitor, I want a contact page with clinic information and a contact form, so that I can reach the clinic with questions.

#### Acceptance Criteria

1. THE Patient_Portal Contact page SHALL display clinic address, phone number, email, and a map placeholder.
2. WHEN a visitor submits the contact form with valid data, THE Patient_Portal SHALL display a success message: "Your message has been sent. We'll get back to you within 24 hours."
3. IF a required field in the contact form is empty on submission, THEN THE Patient_Portal SHALL display an inline validation error beneath the field.

---

### Requirement 16: Public Website — Health Resources Page

**User Story:** As a patient, I want to access health articles and resources, so that I can stay informed about my health.

#### Acceptance Criteria

1. THE Patient_Portal Health Resources page SHALL display at least 6 health articles with title, category, summary, and a "Read More" link.
2. WHEN a patient clicks "Read More", THE Patient_Portal SHALL display the full article content in a modal or detail page.
3. THE Patient_Portal Health Resources page SHALL support filtering articles by category (e.g., Nutrition, Mental Health, Preventive Care).

---

### Requirement 17: Notification System

**User Story:** As any user, I want immediate visual feedback when I perform an action, so that I know whether my action succeeded or failed.

#### Acceptance Criteria

1. WHEN a data operation succeeds (create, update, delete), THE Notification_System SHALL display a green success toast notification with a descriptive message for at least 3 seconds.
2. WHEN a data operation fails or a validation error occurs at the form level, THE Notification_System SHALL display a red error toast notification with a descriptive message.
3. THE Notification_System SHALL support stacking multiple toasts and dismiss each independently.
4. WHEN a destructive action (delete, cancel) is triggered, THE Notification_System SHALL display a confirmation dialog before executing the action.

---

### Requirement 18: Responsive Design

**User Story:** As a user on any device, I want the application to be fully usable on mobile, tablet, and desktop, so that I can access clinic services from any device.

#### Acceptance Criteria

1. THE ICMS SHALL render correctly and be fully functional at viewport widths of 375px, 768px, and 1280px.
2. WHILE the viewport width is less than 1024px, THE Staff_Dashboard sidebar SHALL collapse and be accessible via a hamburger toggle.
3. THE ICMS SHALL use Tailwind CSS responsive prefixes (`sm:`, `md:`, `lg:`) to adapt layouts at each breakpoint.
4. THE Bottom_Nav SHALL only render on viewports narrower than 1024px and SHALL be hidden on desktop.

---

### Requirement 19: Color Palette and Visual Design

**User Story:** As a clinic stakeholder, I want the application to use the Green Valley Clinic brand colors consistently, so that the prototype reflects the clinic's identity.

#### Acceptance Criteria

1. THE ICMS SHALL apply `#A8D98A` as the primary action color for buttons, active states, and highlights.
2. THE ICMS SHALL apply `#F0F9D4` as the primary background color for content areas and cards.
3. THE ICMS SHALL apply `#E8DFC8` as the secondary background for alternating sections and sidebar backgrounds.
4. THE ICMS SHALL apply `#1E2A6E` as the primary text and heading color for all headings and key UI labels.
5. THE ICMS SHALL use Font Awesome icons consistently across all navigation, action buttons, and status indicators.
