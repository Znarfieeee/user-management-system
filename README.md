# User Management System | Group Project Activity - Full-Stack Application Development

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

  FIRST: Helpers Folder
      Path: /_helpers
      The helpers folder contains all the bits and pieces that don't fit into other folders but don't justify having a folder of their own.
   ![image](https://github.com/Znarfieeee/user-management-system/blob/c478b183b2e4c285fe5b3ed967dc0eced9ac3fd1/Screenshot%202025-04-13%20131033.png)


   NEXT: Role Object / Enum
      Path: /_helpers/role.js
      The role object defines all the roles in the example application. I created it to use like an enum to avoid passing roles around as strings, so instead of 'Admin' and 'User' we can use Role.Admin and           Role.User.
      ![image](https://github.com/Znarfieeee/user-management-system/blob/8317b491faf700f59bf99f49913b0ba9c373f3ea/Screenshot%202025-04-13%20131119.png) 


  
   NEXT: **Send Email Helper**
         Path: /_helpers/send-email.js
     lightweight wrapper around the nodemailer module to simplify sending emails from anywhere in the application. It is used by the account service to send account verification and password reset emails.
    ![image](https://github.com/user-attachments/assets/6c51d9fb-90c1-459e-b699-a44b16bba5d3)

    NEXT: Swagger API Docs Route Handler (/api-docs)
                Path: /_helpers/swagger.js
   The Swagger docs route handler uses the Swagger UI Express module to serve auto-generated Swagger UI documentation based on the swagger.yaml file from the /api-docs path of the api. The route handler is bound       to the /api-docs path in the main server.js file.
    ![image](https://github.com/Znarfieeee/user-management-system/blob/e83fc7eea9f06bd26be19dd097c50e54f07f25d2/Screenshot%202025-04-13%20125001.png)


    NEXT: Authorize Middleware
        Path: /_middleware/authorize.js
      The authorized middleware can be added to any route to restrict access to the route to authenticated users with specified roles. If the roles parameter is omitted (i.e. authorize()) then the route will be            accessible to all authenticated users regardless of role. It is used by the accounts controller to restrict access to account CRUD routes and revoke token routes.
   ![image](https://github.com/Znarfieeee/user-management-system/blob/b149c3c38e3aa5ff8a8ea40f1f4fdf159f098611/Screenshot%202025-04-13%20130006.png)

     NEXT: Global Error Handler Middleware
        Path: /_middleware/error-handler.js
     The global error handler is used to catch all errors and remove the need for duplicated error handling code throughout the boilerplate application. It's configured as middleware in the main server.js file.
  ![image](https://github.com/Znarfieeee/user-management-system/blob/7837e1078e43a7721cc408bba47dd0d1d2af8881/Screenshot%202025-04-13%20130214.png)

    NEXT: Validate Request Middleware
      Path: /_middleware/validate-request.js
      The validate request middleware function validates the body of a request against a Joi schema object.
  ![image](https://github.com/Znarfieeee/user-management-system/blob/dd8c24bf012f18079493a6608e3100c380b01775/Screenshot%202025-04-13%20130437.png)
      

    NEXT: Sequelize Account Model
    Path: /accounts/account.model.js
    The account model uses Sequelize to define the schema for the accounts table in the MySQL database. 
   ![image](https://github.com/Znarfieeee/user-management-system/blob/8e01f6509f91ebb6a7214a5ee87b7ecfeaa7b02d/Screenshot%202025-04-13%20131352.png)

  ![image](https://github.com/Znarfieeee/user-management-system/blob/8e01f6509f91ebb6a7214a5ee87b7ecfeaa7b02d/Screenshot%202025-04-13%20131411.png)
   
    NEXT: Sequelize Refresh Token Model
      Path: /accounts/refresh-token.model.js
      The refresh token model uses Sequelize to define the schema for the refreshTokens table in the MySQL database. The exported Sequelize model object gives full access to perform CRUD (create, read, update,     delete) operations on refresh tokens in MySQL, see the account service below for examples of it being used (via the db helper).
  ![image](https://github.com/Znarfieeee/user-management-system/blob/2d8a93c37ec4e1b3193d2415e68af540437ad066/Screenshot%202025-04-13%20132104.png) 

    NEXT: Account Service
      Path: /accounts/account.service.js
      The account service contains the core business logic for account sign up & verification, authentication with JWT & refresh tokens, forgot password & reset password functionality, as well as CRUD methods         for managing account data. The service encapsulates all interaction with the sequelize account models and exposes a simple set of methods which are used by the accounts controller.
  ![image](https://github.com/Znarfieeee/user-management-system/blob/01f903540be3f1bd3f16899ec51bc868223cc4ef/Screenshot%202025-04-13%20132257.png) 
   ![image](https://github.com/Znarfieeee/user-management-system/blob/01f903540be3f1bd3f16899ec51bc868223cc4ef/Screenshot%202025-04-13%20132310.png) 
 ![image](https://github.com/Znarfieeee/user-management-system/blob/01f903540be3f1bd3f16899ec51bc868223cc4ef/Screenshot%202025-04-13%20132321.png) 
 ![image](https://github.com/Znarfieeee/user-management-system/blob/01f903540be3f1bd3f16899ec51bc868223cc4ef/Screenshot%202025-04-13%20132331.png) 
 ![image](https://github.com/Znarfieeee/user-management-system/blob/01f903540be3f1bd3f16899ec51bc868223cc4ef/Screenshot%202025-04-13%20132340.png) 
 ![image](https://github.com/Znarfieeee/user-management-system/blob/01f903540be3f1bd3f16899ec51bc868223cc4ef/Screenshot%202025-04-13%20132348.png) 
 ![image](https://github.com/Znarfieeee/user-management-system/blob/01f903540be3f1bd3f16899ec51bc868223cc4ef/Screenshot%202025-04-13%20132437.png) 
 ![image](https://github.com/Znarfieeee/user-management-system/blob/01f903540be3f1bd3f16899ec51bc868223cc4ef/Screenshot%202025-04-13%20132619.png) 
 ![image](https://github.com/Znarfieeee/user-management-system/blob/01f903540be3f1bd3f16899ec51bc868223cc4ef/Screenshot%202025-04-13%20132625.png) 

    NEXT: Express.js Accounts Controller
      Path: /accounts/accounts.controller.js
      The accounts controller defines all /accounts routes for the Node.js + MySQL boilerplate api, the route definitions are grouped together at the top of the file and the implementation functions are below,       followed by local helper functions. The controller is bound to the /accounts path in the main server.js file.
  ![image](https://github.com/Znarfieeee/user-management-system/blob/45374a1cfe6ee9fb076c12a8f1102b383407bbf8/Screenshot%202025-04-13%20133410.png) 
  ![image](https://github.com/Znarfieeee/user-management-system/blob/45374a1cfe6ee9fb076c12a8f1102b383407bbf8/Screenshot%202025-04-13%20133424.png) 
  ![image](https://github.com/Znarfieeee/user-management-system/blob/45374a1cfe6ee9fb076c12a8f1102b383407bbf8/Screenshot%202025-04-13%20133438.png) 
  ![image](https://github.com/Znarfieeee/user-management-system/blob/45374a1cfe6ee9fb076c12a8f1102b383407bbf8/Screenshot%202025-04-13%20133451.png) 
  ![image](https://github.com/Znarfieeee/user-management-system/blob/45374a1cfe6ee9fb076c12a8f1102b383407bbf8/Screenshot%202025-04-13%20133451.png) 
  ![image](https://github.com/Znarfieeee/user-management-system/blob/45374a1cfe6ee9fb076c12a8f1102b383407bbf8/Screenshot%202025-04-13%20133503.png) 
  ![image](https://github.com/Znarfieeee/user-management-system/blob/45374a1cfe6ee9fb076c12a8f1102b383407bbf8/Screenshot%202025-04-13%20133516.png) 
  ![image](https://github.com/Znarfieeee/user-management-system/blob/45374a1cfe6ee9fb076c12a8f1102b383407bbf8/Screenshot%202025-04-13%20133525.png) 


    NEXT: Api Config
      Path: /config.json
      The api config file contains configuration data for the boilerplate api, it includes the database connection options for the MySQL database, the secret used for signing and verifying JWT tokens, the             emailFrom address used to send emails, and the smtpOptions used to connect and authenticate with an email server.
  ![image](https://github.com/Znarfieeee/user-management-system/blob/509ec37393e4d597de087ee3af622f44b84acd99/Screenshot%202025-04-13%20134108.png) 


    NEXT: Package.json
        Path: /package.json
        The package.json file contains project configuration information including package dependencies which get installed when you run npm install.
   ![image](https://github.com/Znarfieeee/user-management-system/blob/509ec37393e4d597de087ee3af622f44b84acd99/Screenshot%202025-04-13%20134204.png) 


     NEXT: Server Startup File
          Path: /server.js
     The server.js file is the entry point into the boilerplate Node.js api, it configures application middleware, binds controllers to routes and starts the Express web server for the api.
  ![image](https://github.com/Znarfieeee/user-management-system/blob/509ec37393e4d597de087ee3af622f44b84acd99/Screenshot%202025-04-13%20134219.png) 


      NEXT: Swagger API Documentation
            Path: /swagger.yaml
            The Swagger YAML file describes the entire Node.js Boilerplate API using the OpenAPI Specification format, it includes descriptions of all routes and HTTP methods on each route, request and response             schemas, path parameters, and authentication methods.
          The YAML documentation is used by the swagger.js helper to automatically generate and serve interactive Swagger UI documentation on the /api-docs route of the boilerplate api. To preview the Swagger UI           documentation without running the api simply copy and paste the below YAML into the swagger editor at https://editor.swagger.io/.
          File: swagger.yaml


      NEXT: Test the Node.js Boilerplate API
            To register a new account with the Node.js boilerplate api follow these steps:
          1.  Open a new request tab by clicking the plus (+) button at the end of the tabs.
          2. Change the http request method to "POST" with the dropdown selector on the left of the URL input field.
          3. In the URL field enter the address to the register route of your local API - http://localhost:4000/accounts/register
          4.Select the "Body" tab below the URL field, change the body type radio button to "raw", and change the format dropdown selector to "JSON".
          5. Enter a JSON object containing the required user properties in the "Body" textarea, e.g:
          6. Click the "Send" button, you should receive a "200 OK" response with a "registration successful" message in the response body.
  ![image](https://github.com/Znarfieeee/user-management-system/blob/a3427de8a60b402852fe0e33dbd9e3e7ad0e58b7/Screenshot%202025-04-13%20201905.png) 

      And this is a screenshot of the verification email received with the token to verify the account:
  ![image](https://github.com/Znarfieeee/user-management-system/blob/dc68b3223a04f009516cd1760b88882be67952dd/Screenshot%202025-04-13%20220709.png) 

      NEXT: How to verify an account with Postman
          To verify an account with the Node api follow these steps:
          1.Open a new request tab by clicking the plus (+) button at the end of the tabs.
          2.Change the http request method to "POST" with the dropdown selector on the left of the URL input field.
          3. In the URL field enter the address to the authenticate route of your local API - http://localhost:4000/accounts/verify-email
          4. Select the "Body" tab below the URL field, change the body type radio button to "raw", and change the format dropdown selector to "JSON".
          5. Enter a JSON object containing the token received in the verification email (in the previous step) in the "Body" textarea, e.g:
          6. Click the "Send" button, you should receive a "200 OK" response with a "verification successful" message in the response body.
   ![image](https://github.com/Znarfieeee/user-management-system/blob/c614fc278174033e7c444d53eec4a639605cf9bd/Screenshot%202025-04-13%20201909.png) 
     
       
       NEXT: How to access an account if you forgot the password
             To re-enable access to an account with a forgotten password you need to submit the email address of the account to the /account/forgot-password route, the route will then send a token to the email               which will allow you to reset the password of the account in the next step.
Follow these steps in Postman if you forgot the password for an account:
  1. Open a new request tab by clicking the plus (+) button at the end of the tabs.
  2. Change the http request method to "POST" with the dropdown selector on the left of the URL input field.
  3. In the URL field enter the address to the authenticate route of your local API - http://localhost:4000/accounts/forgot-password
  4. Select the "Body" tab below the URL field, change the body type radio button to "raw", and change the format dropdown selector to "JSON".
  5. Enter a JSON object containing the email of the account with the forgotten password in the "Body" textarea, e.g:
  6. Click the "Send" button, you should receive a "200 OK" response with the message "Please check your email for password reset instructions" in the response body.
 ![image](https://github.com/Znarfieeee/user-management-system/blob/a3d5299dd11c3e55c0f5dc318a9dfae08b0de2cc/Screenshot%202025-04-13%20202031.png)

     And this is a screenshot of the email received with the token to reset the password of the account:
![image](https://github.com/Znarfieeee/user-management-system/blob/3d48b9ca46b3e952ce8bde11727fe073a4f8422b/Screenshot%202025-04-13%20221549.png)


      NEXT: How to reset the password of an account with Postman
        To reset the password of an account with the api follow these steps:
          1.Open a new request tab by clicking the plus (+) button at the end of the tabs.
          2. Change the http request method to "POST" with the dropdown selector on the left of the URL input field.
          3. In the URL field enter the address to the authenticate route of your local API - http://localhost:4000/accounts/reset-password
          4. Select the "Body" tab below the URL field, change the body type radio button to "raw", and change the format dropdown selector to "JSON".
          5. Enter a JSON object containing the password reset token received in the email from the forgot password step, along with a new password and matching confirmPassword, into the "Body" textarea, e.g:
          6. Click the "Send" button, you should receive a "200 OK" response with a "password reset successful" message in the response body.
     ![image](https://github.com/Znarfieeee/user-management-system/blob/b9fe489b374139256bdf026d5ae732a398b26e37/Screenshot%202025-04-13%20205023.png)


       NEXT: How to authenticate with Postman
          To authenticate an account with the api and get a JWT token follow these steps:
            1. Open a new request tab by clicking the plus (+) button at the end of the tabs.
            2.Change the http request method to "POST" with the dropdown selector on the left of the URL input field.
            3.In the URL field enter the address to the authenticate route of your local API - http://localhost:4000/accounts/authenticate
            4. Select the "Body" tab below the URL field, change the body type radio button to "raw", and change the format dropdown selector to "JSON".
            5. Enter a JSON object containing the account email and password in the "Body" textarea:
            6. Click the "Send" button, you should receive a "200 OK" response with the user details including a JWT token in the response body and a refresh token in the response cookies.
            7. Copy the JWT token value because we'll be using it in the next steps to make authenticated requests.
      ![image](https://github.com/Znarfieeee/user-management-system/blob/49d949bd9874b60a465dfe2faa85fad1e49efd31/Screenshot%202025-04-13%20202714.png)

         And this is the response cookies tab with the refresh token:
       ![image](https://github.com/Znarfieeee/user-management-system/blob/1f3a49a0569dd7c7ee491491e6c5973e125d7b0a/Screenshot%202025-04-13%20222542.png)
       ![image](https://github.com/Znarfieeee/user-management-system/blob/8746f4ec537c5c23632acfa8d3abc30053150d47/Screenshot%202025-04-13%20222803.png)
   







 

     





 

      




    












  

     

      


   




