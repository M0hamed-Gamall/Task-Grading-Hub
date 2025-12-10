import dotenv from "dotenv";
dotenv.config({
  path: "./src/config/.env",
});
import express from "express";
import type { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import { connectDB } from "./config/database.js";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js"
import taskRoters from "./routes/task.route.js"
import gradeRouters from "./routes/grade.route.js"
import submissionRouter from "./routes/submission.route.js"
import AppError from "./utils/appError.js";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";

await connectDB();






const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: "Task Grading Hub API Documentation",
}));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes)
app.use("/api/tasks", taskRoters)
app.use("/api/submissions", submissionRouter)
app.use("/api/grades", gradeRouters)


// handle non existing route
app.use((req, res, next)=> {
    res.status(404).json({status: "Not Found", message: 'Not Found' })
})

// Global Error-Handling Middleware
app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
  console.log(err)
    res.status(err.statusCode || 500).json({code: err.statusCode || 500, status: err.statusText || "Internal Server Error" , message: err.message})
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});