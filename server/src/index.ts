import express, { Application, Response, Request, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import { config } from "dotenv";
import { routes } from "./routes";

config();
export const secretKey = String(process.env.secretKey);
export const prisma = new PrismaClient();
const PORT = process.env.PORT || 8000;
const app: Application = express();

app.use(express.json());
app.use(cors());

//routes
app.use("/users", routes.userRoutes);
app.use("/events", routes.eventRoutes);

//error handler
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send({
    success: false,
    message: error.message,
  });
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
