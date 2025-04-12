# User Management System | Frontend Documentation

## Overview

This document focuses on the frontend functionalities of the User Management System, built using **Angular**. The frontend provides a responsive and interactive user interface for managing accounts and user profiles.

## Features

-   **Email Sign-Up and Verification**: Allows users to register and verify their email addresses.
-   **JWT Authentication with Refresh Tokens**: Secure user sessions with token-based authentication.
-   **Role-Based Authorization**: Supports Admin and User roles with restricted access to certain features.
-   **Forgot Password and Reset Password**: Enables users to recover and reset their passwords.
-   **Profile Management**: Users can view and update their profiles.
-   **Admin Dashboard**: Admin users can manage all accounts.
-   **Fake Backend**: Simulates backend functionality for development and testing without a live server.

## Pre-Installation Steps

1. Ensure you have **Node.js** installed on your system.
2. Install Angular CLI globally:
    ```bash
    npm install -g @angular/cli
    ```
3. Clone the repository:
    ```bash
    git clone <repository-url>
    ```
4. Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
5. Install dependencies:
    ```bash
    npm install
    ```

## Running the Frontend

To start the Angular development server, use the following command:

```bash
ng serve
```

The application will run on the default port (e.g., `http://localhost:4200`).

## Designated Documentation Area

-   **Component Structure**: Refer to `docs/component-structure.md` for details on the component hierarchy.
-   **Routing**: See `docs/routing.md` for information on application routes and guards.
-   **State Management**: Documentation on state management is available in `docs/state-management.md`.

## Frontend Developers

-   **Developer 3**: Rolly G. Alonso - Implemented email sign-up, verification, and authentication.
-   **Developer 4**: Chad Rv G. Abcede - Implemented profile management, admin dashboard, and fake backend.

## Testers

-   **Tester 1**: Mari Franz H. Espelita - Performed functional testing and validated user flows.
-   **Tester 2**: Eldrin A. Trapa - Performed security testing and validated edge cases.
