import dotenv from "dotenv";
dotenv.config({
  path: "./src/config/.env",
});
import express from "express";
import morgan from "morgan";
import { connectDB } from "./config/database.js";

await connectDB();






const app = express();
app.use(express.json());
app.use(morgan("dev"));


app.get("/", (req, res) => {
  res.send("starting point");
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});