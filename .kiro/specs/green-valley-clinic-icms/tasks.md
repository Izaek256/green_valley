# Implementation Plan: Green Valley Clinic ICMS

## Overview

Build the Green Valley Clinic ICMS as a React + Vite SPA with two surfaces (Staff Dashboard and Patient Portal), a localStorage-backed Mock_Store data layer, React Context for state, and React Router v6 for navigation. Implementation proceeds from the data layer upward through shared infrastructure, then staff features, then public/patient features.

## Tasks

- [ ] 1. Project setup and configuration
  - Scaffold Vite + React + TypeScript project
  - Install and configure Tailwind CSS, shadcn/ui, React Router v6, Vitest, fast-check, and @testing-library/react
  - Configure `tailwind.config.ts` with the clinic color palette (`#A8D98A`, `#F0F9D4`, `#E8DFC8`, `#1E2A6E`)
  - Add Font Awesome via CDN or package
  - Set up `tsconfig.json` path aliases (`@/` → `src/`)
  - _Requirements: 19.1, 19.2, 19.3, 19.4, 19.5_

- [ ] 2. Data models and Mock_Store
  - [ ] 2.1 Define all TypeScript interfaces and types
    - Create `src/data/types.ts` with `User`, `Patient`, `Doctor`, `Appointment`, `StaffMember`, `Service`, `TimeSlot`, `ActivityLogEntry`, `HealthArticle`, `MedicalHistoryEntry`, `WorkingHours`, `Role`, `AppointmentStatus`
    - _Requirements: 1.3_

  - [ ] 2.2 Implement seed data
    - Create `src/data/seed.ts` with at least 10 patients, 5 doctors (with `workingHours`), 3 staff users, 20 appointments spanning past and future dates, and services
    - Create `src/data/mockArticles.ts` with at least 6 health articles across multiple categories
    - _Requirements: 1.1, 16.1_

  - [ ] 2.3 Implement Mock_Store module
    - Create `src/data/mockStore.ts` implementing the full `MockStore` interface
    - Implement `initialize()` with `gvc_initialized` guard to prevent re-seeding
    - Implement CRUD for patients, appointments, doctors, staff, users
    - Implement `getActivityLog()` and activity log writes on every mutation
    - Implement `generateBookingRef()` with `GVC-YYYYMMDD-XXXX` format
    - Implement `getAvailableSlots()` delegating to `slotUtils`
    - Persist each collection to its `localStorage` key on every write
    - _Requirements: 1.1, 1.2, 1.3, 1.4_

  - [ ] 2.4 Write unit tests for Mock_Store
    - Test `initialize()` seeds correct record counts
    - Test CRUD round-trips (create → read → update → delete)
    - Test `generateBookingRef()` format
    - Test `gvc_initialized` flag prevents re-seeding
    - _Requirements: 1.1, 1.2, 1.3, 1.4_

- [ ] 3. Utility libraries
  - [ ] 3.1 Implement `src/lib/slotUtils.ts`
    - Implement `generateSlots(doctor, date)` using 30-minute intervals within `workingHours`
    - Implement `getAvailableSlots(doctorId, date)` filtering out booked (non-Cancelled) appointments
    - _Requirements: 5.3, 5.4, 12.2_

  - [ ] 3.2 Write unit tests for slotUtils
    - Test `generateSlots` returns empty array on doctor's day off
    - Test `generateSlots` produces correct slot count for a given working window
    - Test `getAvailableSlots` marks booked slots as unavailable
    - Test `getAvailableSlots` treats Cancelled appointments as available
    - _Requirements: 5.3, 5.4, 12.2_

  - [ ] 3.3 Implement `src/lib/validators.ts`
    - Implement validation helpers: required field, email format, phone format, date of birth
    - _Requirements: 5.5, 6.4, 7.5, 12.3, 13.4, 15.3_

  - [ ] 3.4 Write unit tests for validators
    - Test each validator with valid and invalid inputs
    - _Requirements: 5.5, 6.4, 7.5, 12.3, 13.4, 15.3_

  - [ ] 3.5 Implement `src/lib/utils.ts`
    - Implement `cn()` (Tailwind class merge helper)
    - Implement date formatting helpers (display date, age from DOB, ISO helpers)
    - _Requirements: 6.1_

- [ ] 4. Auth infrastructure
  - [ ] 4.1 Implement `AuthContext` and `AuthProvider`
    - Create `src/context/AuthContext.tsx` with `login`, `logout`, `register` functions
    - `login`: look up user by email, compare password, write `gvc_session` to localStorage, return role
    - `logout`: clear `gvc_session`, redirect to `/login`
    - `register`: validate uniqueness, create `User` + `Patient` records, write session
    - Session restoration on mount: read `gvc_session`, verify `isActive`, restore state
    - Handle deactivated account with inline error
    - _Requirements: 2.1, 2.2, 2.4, 2.5, 2.6, 7.4, 13.2, 13.3_

  - [ ] 4.2 Implement `useAuth` hook
    - Create `src/hooks/useAuth.ts` consuming `AuthContext`
    - _Requirements: 2.1_

  - [ ] 4.3 Implement `ProtectedRoute` component
    - Create `src/components/shared/ProtectedRoute.tsx`
    - Redirect unauthenticated users to `/login`
    - Redirect authenticated users with wrong role to their home route
    - _Requirements: 2.6, 2.7, 2.8, 2.9_

  - [ ] 4.4 Write unit tests for auth logic
    - Test login with valid credentials returns success and writes session
    - Test login with invalid credentials returns error without clearing email
    - Test deactivated account login returns deactivation error
    - Test session restoration from localStorage
    - Test duplicate email registration returns inline error
    - _Requirements: 2.1, 2.2, 2.4, 7.4, 13.3_

- [ ] 5. Checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 6. App context and global state
  - [ ] 6.1 Implement `AppContext` and `AppProvider`
    - Create `src/context/AppContext.tsx` with `patients`, `appointments`, `doctors`, `staff`, `activityLog` state
    - Implement `refreshPatients()`, `refreshAppointments()`, `refreshAll()` reading from Mock_Store
    - Implement `addToast()` for the notification system
    - _Requirements: 4.2, 17.1, 17.2, 17.3_

  - [ ] 6.2 Implement custom data hooks
    - Create `src/hooks/useAppointments.ts` and `src/hooks/usePatients.ts` consuming `AppContext`
    - Create `src/hooks/useToast.ts` for toast management
    - _Requirements: 4.2, 17.1, 17.2, 17.3_

- [ ] 7. Notification system
  - [ ] 7.1 Implement `ToastProvider` and toast components
    - Create `src/components/shared/ToastProvider.tsx` rendering a stacked toast list
    - Support green success and red error variants
    - Auto-dismiss after ≥3 seconds; support independent manual dismiss
    - _Requirements: 17.1, 17.2, 17.3_

  - [ ] 7.2 Implement `ConfirmDialog` component
    - Create `src/components/shared/ConfirmDialog.tsx` using shadcn/ui Dialog
    - Support `destructive` and `default` variants
    - _Requirements: 5.7, 6.6, 17.4_

- [ ] 8. Staff layout and navigation
  - [ ] 8.1 Implement `Sidebar` component
    - Create `src/components/layout/Sidebar.tsx` with collapsible behavior on desktop (≥1024px)
    - Filter nav links by role (admin sees all; doctor/receptionist see Appointments + Patients)
    - Display logged-in user's name and role in sidebar header
    - _Requirements: 3.1, 3.2, 3.7, 2.7, 2.8, 2.9_

  - [ ] 8.2 Implement `TopBar` and `BottomNav` components
    - Create `src/components/layout/TopBar.tsx` with user info
    - Create `src/components/layout/BottomNav.tsx` fixed bottom bar visible only on viewports <1024px with top 5 routes, active item highlight
    - _Requirements: 3.5, 3.6, 18.4_

  - [ ] 8.3 Implement `Breadcrumb` component
    - Create `src/components/layout/Breadcrumb.tsx` showing full path with clickable segments
    - _Requirements: 3.3, 3.4_

  - [ ] 8.4 Implement `StaffLayout`
    - Create `src/components/layout/StaffLayout.tsx` composing Sidebar + TopBar + Breadcrumb + `<Outlet />`
    - Sidebar collapses via hamburger toggle on viewports <1024px
    - _Requirements: 3.1, 3.2, 18.2_

- [ ] 9. Staff Dashboard overview page
  - [ ] 9.1 Implement `StatCard` and `ActivityFeed` shared components
    - Create `src/components/shared/StatCard.tsx` with label, value, icon, optional trend
    - Create `src/components/shared/ActivityFeed.tsx` showing last 10 activity log entries
    - _Requirements: 4.1, 4.4_

  - [ ] 9.2 Implement `DashboardPage`
    - Create `src/pages/staff/DashboardPage.tsx`
    - Render stat cards: Total Patients, Today's Appointments, Pending Appointments, Active Doctors
    - Render today's upcoming appointments sorted by time
    - Render `ActivityFeed`
    - Stats update reactively when AppContext data changes
    - _Requirements: 4.1, 4.2, 4.3, 4.4_

- [ ] 10. Appointment management module
  - [ ] 10.1 Implement `StatusBadge` and `SlotPicker` components
    - Create `src/components/appointments/StatusBadge.tsx` with colored pill per status
    - Create `src/components/appointments/SlotPicker.tsx` fetching available slots for a doctor + date and rendering selectable time buttons
    - _Requirements: 5.3, 5.4_

  - [ ] 10.2 Implement `AppointmentForm` component
    - Create `src/components/appointments/AppointmentForm.tsx` for create/edit
    - Validate all required fields inline on submit
    - On submit: call `getAvailableSlots()` immediately before saving to prevent double-booking; show error toast if slot taken
    - Save to Mock_Store, call `refreshAppointments()`, show success toast
    - _Requirements: 5.3, 5.4, 5.5, 5.6, 12.5, 17.1, 17.2_

  - [ ] 10.3 Implement `AppointmentTable` component
    - Create `src/components/appointments/AppointmentTable.tsx`
    - Searchable (real-time filter as user types) with columns: Patient Name, Doctor, Date, Time, Status
    - Filter by status: All, Pending, Confirmed, Completed, Cancelled
    - _Requirements: 5.1, 5.2, 5.8_

  - [ ] 10.4 Implement `AppointmentsPage`
    - Create `src/pages/staff/AppointmentsPage.tsx`
    - Compose `AppointmentTable` + `AppointmentForm` (in dialog/panel) + `ConfirmDialog` for cancellation
    - Status change updates Mock_Store and reflects immediately in table
    - _Requirements: 5.1, 5.2, 5.5, 5.6, 5.7, 5.8_

  - [ ] 10.5 Write unit tests for appointment logic
    - Test double-booking prevention rejects a slot that becomes taken
    - Test status change updates record correctly
    - Test real-time search filtering
    - _Requirements: 5.4, 5.5, 5.6, 12.5_

- [ ] 11. Patient records module
  - [ ] 11.1 Implement `PatientForm` component
    - Create `src/components/patients/PatientForm.tsx` for create/edit
    - Inline validation on required fields
    - Save to Mock_Store, refresh, show success toast
    - _Requirements: 6.3, 6.4, 6.5_

  - [ ] 11.2 Implement `PatientTable` component
    - Create `src/components/patients/PatientTable.tsx`
    - Columns: Name, Age, Gender, Contact, Last Visit; real-time search
    - _Requirements: 6.1, 6.2_

  - [ ] 11.3 Implement `PatientDetail` component
    - Create `src/components/patients/PatientDetail.tsx`
    - Show personal info, medical history entries, appointment history
    - _Requirements: 6.2_

  - [ ] 11.4 Implement `PatientsPage` and `PatientDetailPage`
    - Create `src/pages/staff/PatientsPage.tsx` composing `PatientTable` + `PatientForm` + `ConfirmDialog` for delete
    - Create `src/pages/staff/PatientDetailPage.tsx` rendering `PatientDetail`
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6_

- [ ] 12. Staff management module (admin only)
  - [ ] 12.1 Implement `StaffForm` and `StaffTable` components
    - Create `src/components/staff/StaffTable.tsx` with columns: Name, Role, Email, Status
    - Create `src/components/staff/StaffForm.tsx` with inline validation
    - _Requirements: 7.1, 7.2, 7.5_

  - [ ] 12.2 Implement `StaffPage`
    - Create `src/pages/staff/StaffPage.tsx` composing `StaffTable` + `StaffForm`
    - Role change and deactivation update Mock_Store and show success toast
    - Deactivated accounts blocked from login via `AuthContext`
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

- [ ] 13. Reports module (admin only)
  - [ ] 13.1 Implement chart components
    - Create `src/components/reports/AppointmentChart.tsx` — bar chart of appointments by status
    - Create `src/components/reports/PatientGrowthChart.tsx` — bar chart of new patients per month
    - Create `src/components/reports/DoctorWorkloadChart.tsx` — bar chart of appointments per doctor
    - Use Recharts or a lightweight charting library compatible with Vite/React
    - _Requirements: 8.1, 8.2_

  - [ ] 13.2 Implement `ReportsPage`
    - Create `src/pages/staff/ReportsPage.tsx` composing all three charts
    - Implement date range filter that recalculates and re-renders chart data
    - _Requirements: 8.1, 8.2, 8.3_

- [ ] 14. Checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 15. Public website layout and navigation
  - [ ] 15.1 Implement `PublicNavbar` component
    - Create `src/components/layout/PublicNavbar.tsx` with links: Home, Services, Doctors, Book Appointment, Contact, Login/Register
    - Hamburger menu on viewports <768px opening a slide-in/full-screen mobile menu
    - Apply clinic color palette
    - _Requirements: 9.1, 9.2, 9.3, 9.4_

  - [ ] 15.2 Implement `PublicLayout`
    - Create `src/components/layout/PublicLayout.tsx` composing `PublicNavbar` + `<Outlet />` + footer
    - _Requirements: 9.1, 9.2_

- [ ] 16. Public website pages
  - [ ] 16.1 Implement public shared components
    - Create `src/components/public/HeroSection.tsx`, `ServicesOverview.tsx`, `FeaturedDoctors.tsx`, `DoctorCard.tsx`, `ArticleCard.tsx`
    - _Requirements: 10.1, 10.3, 10.4, 11.2_

  - [ ] 16.2 Implement `HomePage`
    - Create `src/pages/public/HomePage.tsx`
    - Hero section with headline, subheadline, "Book Appointment" CTA navigating to `/book`
    - Services overview (≥4 services with icons and descriptions)
    - Featured doctors section (≥3 doctor cards with "Book" button navigating to `/book?doctorId=...`)
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_

  - [ ] 16.3 Implement `ServicesPage` and `DoctorsPage`
    - Create `src/pages/public/ServicesPage.tsx` listing all services with associated doctors
    - Create `src/pages/public/DoctorsPage.tsx` listing all doctors with specialty, bio, availability; doctor detail modal with "Book Appointment" button
    - _Requirements: 11.1, 11.2, 11.3_

  - [ ] 16.4 Implement `ContactPage`
    - Create `src/pages/public/ContactPage.tsx`
    - Display clinic address, phone, email, map placeholder
    - Contact form with inline validation; success message on valid submit
    - _Requirements: 15.1, 15.2, 15.3_

  - [ ] 16.5 Implement `HealthResourcesPage`
    - Create `src/pages/public/HealthResourcesPage.tsx`
    - Display ≥6 articles using `ArticleCard`; category filter tabs
    - "Read More" opens full article in modal or detail page
    - _Requirements: 16.1, 16.2, 16.3_

- [ ] 17. Authentication pages
  - [ ] 17.1 Implement `LoginPage`
    - Create `src/pages/public/LoginPage.tsx`
    - Email + password form; validate email format and non-empty password before submit
    - Inline error on invalid credentials (email field preserved)
    - Inline error for deactivated account
    - Redirect to role-appropriate dashboard on success
    - _Requirements: 2.1, 2.2, 13.4_

  - [ ] 17.2 Implement `RegisterPage`
    - Create `src/pages/public/RegisterPage.tsx`
    - Collect: full name, email, password, date of birth, phone number
    - Inline error for duplicate email
    - On success: create User + Patient records, redirect to `/portal`
    - _Requirements: 13.1, 13.2, 13.3, 13.5_

- [ ] 18. Appointment booking flow (public)
  - [ ] 18.1 Implement booking wizard step components
    - Create `src/components/booking/StepSelectDoctor.tsx` — doctor + service selection
    - Create `src/components/booking/StepSelectSlot.tsx` — date + `SlotPicker` integration
    - Create `src/components/booking/StepConfirm.tsx` — review summary + submit
    - Inline validation prevents progression if required fields are empty
    - _Requirements: 12.1, 12.2, 12.3_

  - [ ] 18.2 Implement `BookingWizard` and `BookingPage`
    - Create `src/components/booking/BookingWizard.tsx` managing step state and `preselectedDoctorId` prop
    - Create `src/pages/public/BookingPage.tsx` rendering `BookingWizard`, reading `?doctorId` query param
    - On submit: check slot availability immediately before save; if taken show error toast and prompt re-selection
    - On success: save appointment with status `Pending`, display confirmation summary with booking reference
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5_

  - [ ] 18.3 Write unit tests for booking wizard
    - Test step progression blocked when required fields are empty
    - Test slot-taken error shown when slot becomes unavailable before submit
    - Test booking reference format in confirmation summary
    - _Requirements: 12.3, 12.4, 12.5_

- [ ] 19. Patient portal
  - [ ] 19.1 Implement `PatientLayout`
    - Create `src/components/layout/PatientLayout.tsx` with patient-specific nav and `<Outlet />`
    - _Requirements: 14.1_

  - [ ] 19.2 Implement `PatientDashboardPage`
    - Create `src/pages/portal/PatientDashboardPage.tsx`
    - Display upcoming appointments, past appointments, profile summary
    - Cancel appointment button triggers `ConfirmDialog`, updates status to `Cancelled` in Mock_Store, reflects immediately
    - "Book New Appointment" navigates to `/book`
    - Profile edit form updates Mock_Store and shows success toast
    - _Requirements: 14.1, 14.2, 14.3, 14.4_

- [ ] 20. App entry point and routing
  - [ ] 20.1 Implement `App.tsx` with full route tree
    - Wire `AuthProvider` → `AppProvider` → `ToastProvider` → `Router` → full route tree as defined in design
    - Include all public, `/portal`, and `/staff` routes with `ProtectedRoute` guards
    - Fallback `*` route redirects to `/`
    - _Requirements: 2.6, 2.7, 2.8, 2.9_

  - [ ] 20.2 Implement `main.tsx` entry point
    - Mount `App` into `#root`, call `Mock_Store.initialize()` before render
    - _Requirements: 1.1, 1.2_

- [ ] 21. Responsive design pass
  - Audit all pages at 375px, 768px, and 1280px breakpoints
  - Apply Tailwind `sm:`, `md:`, `lg:` prefixes to fix any layout issues
  - Verify `BottomNav` hidden on desktop, sidebar collapses on mobile
  - _Requirements: 18.1, 18.2, 18.3, 18.4_

- [ ] 22. Final checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- The design uses TypeScript throughout — all files should be `.tsx` or `.ts`
- No property-based tests are included as the design document defines no Correctness Properties
- Checkpoints ensure incremental validation at key milestones
