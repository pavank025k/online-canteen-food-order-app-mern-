import express from "express";
import { menuAdd, menuDelete, menuGet, menuUpdate } from "../controllers/menucontroler.js";



const menurouter=express.Router();
menurouter.post("/menu/add",menuAdd)
menurouter.put("/menu/update/:id",menuUpdate)
menurouter.delete("/menu/delete/:id",menuDelete)


menurouter.get("/menu/get",menuGet)

export default menurouter;
