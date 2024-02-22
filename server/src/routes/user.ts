import express, { Router } from "express";
export const route: Router = express.Router();
import { userController } from "../controller/user";
route.get("/v1", userController.login);
route.get("/keep-login", userController.keepLogin);
route.post("/v2", userController.register);
route.patch("/", userController.forgotPass);
route.patch("/:id");
route.delete("/:id");
