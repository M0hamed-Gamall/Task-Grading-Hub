/**
 * @swagger
 * paths:
 *   /api/auth/register:
 *     post:
 *       summary: Register a new user
 *       tags: [Authentication]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegisterRequest'
 *       responses:
 *         201:
 *           description: User registered successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/AuthResponse'
 *           headers:
 *             Set-Cookie:
 *               description: Refresh token stored in httpOnly cookie
 *               schema:
 *                 type: string
 *         400:
 *           description: Validation error
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ErrorResponse'
 * 
 *   /api/auth/login:
 *     post:
 *       summary: Login user
 *       tags: [Authentication]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginRequest'
 *       responses:
 *         200:
 *           description: Login successful
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/AuthResponse'
 *           headers:
 *             Set-Cookie:
 *               description: Refresh token stored in httpOnly cookie
 *               schema:
 *                 type: string
 *         400:
 *           description: Validation error
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ErrorResponse'
 *         401:
 *           description: Invalid credentials
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ErrorResponse'
 * 
 *   /api/auth/logout:
 *     post:
 *       summary: Logout user
 *       tags: [Authentication]
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         200:
 *           description: Logout successful
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Logged out successfully"
 * 
 *   /api/auth/refresh:
 *     post:
 *       summary: Refresh access token
 *       tags: [Authentication]
 *       security:
 *         - cookieAuth: []
 *       responses:
 *         201:
 *           description: Token refreshed successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/AuthResponse'
 *         401:
 *           description: Invalid or expired refresh token
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ErrorResponse'
 * 
 *   /api/users/me:
 *     get:
 *       summary: Get current user profile
 *       tags: [Users]
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         200:
 *           description: User profile retrieved successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/User'
 *         401:
 *           description: Unauthorized
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ErrorResponse'
 * 
 *   /api/users/{id}:
 *     get:
 *       summary: Get user by ID (Admin only)
 *       tags: [Users]
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *           description: User ID
 *       responses:
 *         200:
 *           description: User retrieved successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/User'
 *         401:
 *           description: Unauthorized
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ErrorResponse'
 *         403:
 *           description: Forbidden - Admin access required
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ErrorResponse'
 *         404:
 *           description: User not found
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ErrorResponse'
 * 
 *   /api/tasks:
 *     post:
 *       summary: Create a new task (Admin only)
 *       tags: [Tasks]
 *       security:
 *         - bearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateTaskRequest'
 *       responses:
 *         201:
 *           description: Task created successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Task'
 *         400:
 *           description: Validation error
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ErrorResponse'
 *         401:
 *           description: Unauthorized
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ErrorResponse'
 *         403:
 *           description: Forbidden - Admin access required
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ErrorResponse'
 *     get:
 *       summary: Get all tasks
 *       tags: [Tasks]
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         200:
 *           description: List of tasks retrieved successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Task'
 *         401:
 *           description: Unauthorized
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ErrorResponse'
 * 
 *   /api/tasks/{id}:
 *     get:
 *       summary: Get task by ID
 *       tags: [Tasks]
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *           description: Task ID
 *       responses:
 *         200:
 *           description: Task retrieved successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Task'
 *         401:
 *           description: Unauthorized
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ErrorResponse'
 *         404:
 *           description: Task not found
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ErrorResponse'
 * 
 *   /api/submissions/submission/{id}:
 *     get:
 *       summary: Get submission by ID
 *       tags: [Submissions]
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *           description: Submission ID
 *       responses:
 *         200:
 *           description: Submission retrieved successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Submission'
 *         401:
 *           description: Unauthorized
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ErrorResponse'
 *         403:
 *           description: Forbidden - Students can only access their own submissions
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ErrorResponse'
 *         404:
 *           description: Submission not found
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ErrorResponse'
 * 
 *   /api/submissions/me:
 *     get:
 *       summary: Get current student's submissions
 *       tags: [Submissions]
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         200:
 *           description: Student submissions retrieved successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   submissions:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/Submission'
 *         401:
 *           description: Unauthorized
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ErrorResponse'
 *         403:
 *           description: Forbidden - Student access required
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ErrorResponse'
 * 
 *   /api/submissions/{taskId}:
 *     post:
 *       summary: Submit a task (Student only)
 *       tags: [Submissions]
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - in: path
 *           name: taskId
 *           required: true
 *           schema:
 *             type: string
 *           description: Task ID
 *       requestBody:
 *         required: true
 *         content:
 *           multipart/form-data:
 *             schema:
 *               type: object
 *               required:
 *                 - file
 *               properties:
 *                 file:
 *                   type: string
 *                   format: binary
 *                   description: PDF file (max 10MB)
 *       responses:
 *         201:
 *           description: Task submitted successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "File uploaded successfully"
 *                   data:
 *                     $ref: '#/components/schemas/Submission'
 *         400:
 *           description: Bad request - No file uploaded, invalid file type, or deadline passed
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ErrorResponse'
 *         401:
 *           description: Unauthorized
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ErrorResponse'
 *         403:
 *           description: Forbidden - Student access required
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ErrorResponse'
 *     get:
 *       summary: Get all submissions for a task (Admin only)
 *       tags: [Submissions]
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - in: path
 *           name: taskId
 *           required: true
 *           schema:
 *             type: string
 *           description: Task ID
 *       responses:
 *         200:
 *           description: Task submissions retrieved successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   submissions:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/Submission'
 *         401:
 *           description: Unauthorized
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ErrorResponse'
 *         403:
 *           description: Forbidden - Admin access required
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ErrorResponse'
 * 
 *   /api/grades/{submissionId}:
 *     post:
 *       summary: Grade a submission (Admin only)
 *       tags: [Grades]
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - in: path
 *           name: submissionId
 *           required: true
 *           schema:
 *             type: string
 *           description: Submission ID
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GradeRequest'
 *       responses:
 *         200:
 *           description: Submission graded successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Submission'
 *         400:
 *           description: Bad request
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ErrorResponse'
 *         401:
 *           description: Unauthorized
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ErrorResponse'
 *         403:
 *           description: Forbidden - Admin access required
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ErrorResponse'
 *         404:
 *           description: Submission not found
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ErrorResponse'
 * 
 *   /api/grades/tasks/{taskId}/me:
 *     get:
 *       summary: Get student's grade for a task
 *       tags: [Grades]
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - in: path
 *           name: taskId
 *           required: true
 *           schema:
 *             type: string
 *           description: Task ID
 *       responses:
 *         200:
 *           description: Student grade retrieved successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Submission'
 *         401:
 *           description: Unauthorized
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ErrorResponse'
 *         403:
 *           description: Forbidden - Student access required
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ErrorResponse'
 *         404:
 *           description: Grade not found
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ErrorResponse'
 * 
 *   /api/grades/tasks/{taskId}:
 *     get:
 *       summary: Get all grades for a task (Admin only)
 *       tags: [Grades]
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - in: path
 *           name: taskId
 *           required: true
 *           schema:
 *             type: string
 *           description: Task ID
 *       responses:
 *         200:
 *           description: Task grades retrieved successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   tasksGrades:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/Submission'
 *         401:
 *           description: Unauthorized
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ErrorResponse'
 *         403:
 *           description: Forbidden - Admin access required
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ErrorResponse'
 */
