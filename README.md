# Task Grading Hub

## Overview

Task Grading Hub is a RESTful API designed to manage programming task submissions and grading in an academic environment. The system allows students to submit their tasks in PDF format and enables an administrator to review, grade, and provide feedback on those submissions.

The API enforces authentication, authorization, and role-based access control to ensure data privacy and proper permissions.

---

## Features

### Admin

* Create and publish programming tasks with deadlines
* View all student submissions for a specific task
* Grade submissions and provide feedback

### Student

* Register and log in to the system
* View available tasks
* Submit tasks in PDF format before the deadline
* View grades and feedback for their own submissions only

---

## Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **Authentication:** JSON Web Tokens (JWT)
* **File Uploads:** Multipart form data with PDF validation

---

## Architecture Overview

The application follows a RESTful architecture built with Express.js. Authentication is handled using JWTs, and authorization is enforced through role-based middleware. MongoDB is used to store users, tasks, submissions, grades, and feedback.

---

## Roles & Authorization

### Student

* Can access only their own submissions and grades
* Cannot view other students' data

### Admin

* Can create tasks
* Can view and grade all submissions

### Authorization Rules

* **401 Unauthorized:** Returned when the user is not authenticated
* **403 Forbidden:** Returned when the user lacks permission to access a resource

---

## API Endpoints (Overview)

### Authentication

* `POST /api/auth/register`
* `POST /api/auth/login`
* `POST /api/auth/logout`
* `POST /api/auth/refresh`
* `GET /api/auth/google`

### Users

* `api/users/me`
* `api/user/:userId` (Admin only)

### Tasks

* `POST /api/tasks` (Admin only)
* `GET /api/tasks`
* `GET /api/tasks/:id`

### Submissions

* `POST /api/submissions/:taskId` (Student only)
* `GET /api/submissions/:taskId` (Admin only)
* `GET /api/submissions/me`
* `GET /api/submissions/submission/:id`

### Grading

* `POST /api/grades/:submissionId` (Admin only)
* `GET /api/grades/tasks/:taskId/me`
* `GET /api/grades/tasks/taskId` (Admin only)

---

## Validation & Security

* Passwords are securely hashed before storage
* JWT authentication is required for protected routes
* Role-based access control is enforced
* Only PDF files are accepted for task submissions
* Server-side request validation is applied
* Proper HTTP status codes are used for error handling

---

## Environment Variables

Create a `.env` file based on the provided `.env.example`.

Required variables may include:

* `PORT`
* `DB_URI`
* `JWT_SECRET`
* `NODE_ENV`

* `CLOUDINARY_CLOUD_NAME`
* `CLOUDINARY_API_KEY`
* `CLOUDINARY_API_SECRET`

* `GOOGLE_CLIENT_ID`
* `GOOGLE_CLIENT_SECRET`
* `CLIENT_URL`


Do not commit real environment variable values to the repository.

---

## Installation & Running

1. Clone the repository
2. Install dependencies
3. Configure environment variables
4. Start the server

The API will be available on the configured port.


