import { body } from "express-validator"

export const taskValidator = [
  body("title")
    .notEmpty().withMessage("title is required"),

  body("description")
    .notEmpty().withMessage("description is required"),

  body("deadline")
    .notEmpty().withMessage("description is required"),
  
]