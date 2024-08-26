import { Router } from "express";
import {   getUser,   editUser,  deleteUser,  getUserID,} from "./user.controller.js";
import { validateReq } from "../middleware.js";
import * as userContraller from "./user.controller.js";

const router = Router();

// router.get("/", userContraller.getUser);    

router.get("/", getUser);

router.post("/create", validateReq , userContraller.createUser);

router.patch("/edit", editUser);

router.delete("/delete/:id", deleteUser);

router.get("/get/:id", getUserID);

export default router;
