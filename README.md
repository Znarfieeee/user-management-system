![image](https://github.com/user-attachments/assets/6c51d9fb-90c1-459e-b699-a44b16bba5d3)# User Management System | Group Project Activity - Full-Stack Application Development

## Project Objectives

The purpose of this project is to develop a full-stack user management system that demonstrates key concepts of modern web application development. This includes user authentication, role-based authorization, and CRUD operations, along with a responsive and interactive frontend.

## Features

### Backend (Node.js + MySQL)

-   Email sign-up and verification.
-   JWT authentication with refresh tokens.
-   Role-based authorization (Admin and User roles).
-   Forgot password and reset password functionality.
-   CRUD operations for managing accounts (restricted to Admin users).

### Frontend (Angular 10/17)

-   Email sign-up and verification.
-   JWT authentication with refresh tokens.
-   Role-based authorization (Admin and User roles).
-   Forgot password and reset password functionality.
-   Profile management (view and update profile).
-   Admin dashboard for managing all accounts (restricted to Admin role).
-   Fake backend implementation for backend-less development and testing.

## Team Members and Roles

### Backend Developers (2 members)

-   **Eldrin Trapa**: Implement email sign-up, verification, and authentication.
-   **Mari Franz Espelita**: Implement role-based authorization, forgot password/reset password, and CRUD operations.

### Frontend Developers (2 members)

-   **Rolly Alonso**: Implement email sign-up, verification, and authentication.
-   **Chad Rv Abcede**: Implement profile management, admin dashboard, and fake backend.

### Testers (2 members)

-   **Mari Franz Espelita**: Perform functional testing and validate user flows.
-   **Eldrin Trapa & Chad Rv Abcede**: Perform security testing and validate edge cases.

-   Developer 1: Implement email sign-up, verification, and authentication.

-   1st : **Send Email Helper**
-         Path: /_helpers/send-email.js
-     lightweight wrapper around the nodemailer module to simplify sending emails from anywhere in the application. It is used by the account service to send account verification and password reset emails.
-    ![image alt] (https://github.com/Znarfieeee/user-management-system/blob/c6f3faa36bd7b417304867c7e9f87a91d81f1a62/Screenshot%202025-04-13%20124212.png)


