import express from "express";
import { adminlogin, adminlogout } from "../controllers/auth.controllers.js";



const adminrouter=express.Router();

adminrouter.post("/login",adminlogin)
adminrouter.post("/logout",adminlogout)



export default adminrouter;