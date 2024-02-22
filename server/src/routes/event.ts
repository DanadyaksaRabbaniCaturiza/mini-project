import express, { Router } from "express";
export const route: Router = express.Router();
import { eventController } from "../controller/event";
route.get("/", eventController.getEvent);
route.post("/", eventController.addEvent);
route.get("/:id", eventController.getById);
route.patch("/:id");
route.delete("/:id");
