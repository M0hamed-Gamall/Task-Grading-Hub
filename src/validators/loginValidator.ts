import { body } from "express-validator";

export const loginValidator = [
  body("email")
    .isEmail().withMessage("Invalid email format"),

  body("password")
    .notEmpty().withMessage("required password"),
];
