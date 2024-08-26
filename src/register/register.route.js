import { Router } from "express";
import * as regisstercontroller from "./register.controller.js";
import { validateToken } from "../middleware.js";
import { validateReq } from "../middleware.js";



const router = Router();
router.post("/post", regisstercontroller.postregister);
router.post("/postuser", regisstercontroller.postuser);
router.post("/postregister", regisstercontroller.postregister);
router.patch("/editregister", regisstercontroller.editregister);
router.post("/loginmember",regisstercontroller.loginmember)
router.get("/getmember",validateToken, regisstercontroller.getmember);
router.patch("/editsign_in", regisstercontroller.editsign_in);
router.get("/getfood_recipes/:id", regisstercontroller.getfood_recipes);
router.put("/editrecipes", regisstercontroller.editrecipes);
router.post("/createrecipes", regisstercontroller.createrecipes);
router.delete("/deletefood_recipes/:id", regisstercontroller.deletefood_recipes);

// ,validateToken



export default router;