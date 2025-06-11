import express from "express";
import { connectDB } from "./infrastructure/config/database"; 
import "./infrastructure/config/container";
export const startServer = async () => {
  await connectDB();

  const app = express();
  const PORT = process.env.PORT || 5000;

  app.use(express.json());

  app.get("/", (_req, res) => {
    res.send("✅ Inventory Management API is running!");
  });

  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  });
};
