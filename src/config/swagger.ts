import swaggerJsdoc from 'swagger-jsdoc';
import type { SwaggerDefinition } from 'swagger-jsdoc';

const swaggerDefinition: SwaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Task Grading Hub API',
    version: '1.0.0',
    description: 'API documentation for Task Grading Hub - A platform for managing tasks, submissions, and grades',
    contact: {
      name: 'API Support',
    },
  },
  servers: [
    {
      url: `http://localhost:${process.env.PORT || 3000}`,
      description: 'Development server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter JWT token obtained from login/register endpoints',
      },
      cookieAuth: {
        type: 'apiKey',
        in: 'cookie',
        name: 'refreshToken',
        description: 'Refresh token stored in httpOnly cookie',
      },
    },
    schemas: {
      User: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
            description: 'User ID',
            example: '507f1f77bcf86cd799439011',
          },
          name: {
            type: 'string',
            description: 'User name',
            example: 'John Doe',
          },
          email: {
            type: 'string',
            format: 'email',
            description: 'User email',
            example: 'john.doe@example.com',
          },
          role: {
            type: 'string',
            enum: ['student', 'admin'],
            description: 'User role',
            example: 'student',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'Account creation date',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'Last update date',
          },
        },
      },
      Task: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
            description: 'Task ID',
            example: '507f1f77bcf86cd799439011',
          },
          title: {
            type: 'string',
            description: 'Task title',
            example: 'Complete Assignment 1',
          },
          description: {
            type: 'string',
            description: 'Task description',
            example: 'Write a comprehensive essay on the topic',
          },
          deadline: {
            type: 'string',
            format: 'date-time',
            description: 'Task deadline',
            example: '2024-12-31T23:59:59.000Z',
          },
          publishedBy: {
            $ref: '#/components/schemas/User',
            description: 'User who published the task',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'Task creation date',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'Last update date',
          },
        },
      },
      Submission: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
            description: 'Submission ID',
            example: '507f1f77bcf86cd799439011',
          },
          taskId: {
            $ref: '#/components/schemas/Task',
            description: 'Associated task',
          },
          studentId: {
            $ref: '#/components/schemas/User',
            description: 'Student who submitted',
          },
          file: {
            type: 'object',
            properties: {
              filename: {
                type: 'string',
                example: 'assignment.pdf',
              },
              url: {
                type: 'string',
                format: 'uri',
                example: 'https://cloudinary.com/assignment.pdf',
              },
              mimeType: {
                type: 'string',
                example: 'application/pdf',
              },
              size: {
                type: 'number',
                example: 1024000,
              },
            },
          },
          submittedAt: {
            type: 'string',
            format: 'date-time',
            description: 'Submission date',
          },
          status: {
            type: 'string',
            enum: ['submitted', 'graded'],
            example: 'submitted',
          },
          grade: {
            type: 'number',
            nullable: true,
            example: 85,
          },
          feedback: {
            type: 'string',
            nullable: true,
            example: 'Good work!',
          },
          gradedBy: {
            $ref: '#/components/schemas/User',
            nullable: true,
            description: 'Admin who graded the submission',
          },
          gradedAt: {
            type: 'string',
            format: 'date-time',
            nullable: true,
            description: 'Grading date',
          },
        },
      },
      RegisterRequest: {
        type: 'object',
        required: ['name', 'email', 'password'],
        properties: {
          name: {
            type: 'string',
            description: 'User name',
            example: 'John Doe',
          },
          email: {
            type: 'string',
            format: 'email',
            description: 'User email',
            example: 'john.doe@example.com',
          },
          password: {
            type: 'string',
            format: 'password',
            minLength: 6,
            description: 'User password (minimum 6 characters)',
            example: 'password123',
          },
        },
      },
      LoginRequest: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: {
            type: 'string',
            format: 'email',
            description: 'User email',
            example: 'john.doe@example.com',
          },
          password: {
            type: 'string',
            format: 'password',
            description: 'User password',
            example: 'password123',
          },
        },
      },
      AuthResponse: {
        type: 'object',
        properties: {
          accessToken: {
            type: 'string',
            description: 'JWT access token',
            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
          },
        },
      },
      CreateTaskRequest: {
        type: 'object',
        required: ['title', 'description', 'deadline'],
        properties: {
          title: {
            type: 'string',
            description: 'Task title',
            example: 'Complete Assignment 1',
          },
          description: {
            type: 'string',
            description: 'Task description',
            example: 'Write a comprehensive essay on the topic',
          },
          deadline: {
            type: 'string',
            format: 'date-time',
            description: 'Task deadline',
            example: '2024-12-31T23:59:59.000Z',
          },
        },
      },
      GradeRequest: {
        type: 'object',
        required: ['degree', 'feedback'],
        properties: {
          degree: {
            type: 'number',
            description: 'Grade score',
            example: 85,
          },
          feedback: {
            type: 'string',
            description: 'Feedback for the submission',
            example: 'Good work!',
          },
        },
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          code: {
            type: 'number',
            example: 400,
          },
          status: {
            type: 'string',
            example: 'Bad Request',
          },
          message: {
            type: 'string',
            example: 'Error message',
          },
        },
      },
      SuccessResponse: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'Operation successful',
          },
        },
      },
    },
  },
  tags: [
    {
      name: 'Authentication',
      description: 'User authentication endpoints',
    },
    {
      name: 'Users',
      description: 'User management endpoints',
    },
    {
      name: 'Tasks',
      description: 'Task management endpoints',
    },
    {
      name: 'Submissions',
      description: 'Submission management endpoints',
    },
    {
      name: 'Grades',
      description: 'Grade management endpoints',
    },
  ],
};

const options = {
  definition: swaggerDefinition,
  apis: ['./src/config/swagger.paths.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);

