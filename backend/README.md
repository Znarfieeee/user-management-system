# User Management System | Backend Documentation

## Overview

This document focuses on the backend functionalities of the User Management System, built using **Node.js** and **MySQL**. The backend handles user authentication, role-based authorization, and account management.

## Features

-   **Email Sign-Up and Verification**: Allows users to register and verify their email addresses.
-   **JWT Authentication with Refresh Tokens**: Secure user sessions with token-based authentication.
-   **Role-Based Authorization**: Supports Admin and User roles with restricted access to certain features.
-   **Forgot Password and Reset Password**: Enables users to recover and reset their passwords.
-   **CRUD Operations**: Admin users can manage accounts (create, read, update, delete).

## Pre-Installation Steps

1. Ensure you have **Node.js** and **MySQL** installed on your system.
2. Clone the repository:
    ```bash
    git clone <repository-url>
    ```
3. Navigate to the backend directory:
    ```bash
    cd backend
    ```
4. Install dependencies:
    ```bash
    npm install
    ```
5. Configure the `.env` file:
    - Create a `.env` file in the backend directory.
    - Add the following environment variables:
        ```
        DB_HOST=<your-database-host>
        DB_USER=<your-database-username>
        DB_PASSWORD=<your-database-password>
        DB_NAME=<your-database-name>
        JWT_SECRET=<your-jwt-secret>
        ```
6. Run database migrations (if applicable):
    ```bash
    npm run migrate
    ```

## Running the Backend

To start the backend server, use the following command:

```bash
npm start
```

The server will run on the default port (e.g., `http://localhost:3000`).

## Designated Documentation Area

-   **API Endpoints**: Detailed documentation for each API endpoint is available in the `docs/api-endpoints.md` file.
-   **Database Schema**: Refer to `docs/database-schema.md` for the database structure and relationships.
-   **Error Handling**: See `docs/error-handling.md` for information on error codes and responses.

## Backend Developers

-   **Developer 1**: Eldrin A. Trapa - Implemented email sign-up, verification, and authentication.
-   **Developer 2**: Mari Franz H. Espelita - Implemented role-based authorization, forgot password/reset password, and CRUD operations.

## Testers

-   **Tester 1**: Mari Franz H. Espelita - Performed functional testing and validated user flows.
-   **Tester 2**: Eldrin A. Trapa - Performed security testing and validated edge cases.
