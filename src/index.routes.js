import { Router } from "express";
import foodRoute from "./register/register.route.js"; 

const router = Router();


router.use("/register", foodRoute);


export default router;