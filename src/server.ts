 import express from "express";
// eslint-disable-next-line import/order
 import { connectDB } from "./infrastructure/config/database";
 import "./infrastructure/config/container";
 import cors from 'cors'
 import cookieParser from "cookie-parser";
 import dotenv from "dotenv";
 import userRoutes from "./presentation/routes/userRoutes";
 import itemRoutes from "./presentation/routes/itemRoutes";
 import customerRoutes from "./presentation/routes/CustomerRoute";
 import saleRoutes from "./presentation/routes/saleRoutes";
 import { errorHandler } from "./middleware/ErrorHanlder"; 
 import { API_ROUTES } from "./constants/ApiRoutes";

 export const startServer = async () => {
  dotenv.config();
  await connectDB();
  const app = express();
  const PORT = process.env.PORT || 5000;
  app.use(express.json());
  app.use(cookieParser());
  app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true, 
  }));
   app.use(`${API_ROUTES.BASE}${API_ROUTES.AUTH.BASE}`, userRoutes);
   app.use(`${API_ROUTES.BASE}${API_ROUTES.ITEMS.BASE}`, itemRoutes);
   app.use(`${API_ROUTES.BASE}${API_ROUTES.CUSTOMERS.BASE}`, customerRoutes);
   app.use(`${API_ROUTES.BASE}${API_ROUTES.SALES.BASE}`, saleRoutes);
   app.use(errorHandler);
   app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`);
  });
};



