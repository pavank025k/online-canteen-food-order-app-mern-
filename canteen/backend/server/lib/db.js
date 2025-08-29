import mongoose from "mongoose";
import { configDotenv } from "dotenv";
 
const db=async()=>{
  configDotenv()
     try{
        mongoose.connect(process.env.MONGOOSE_URL)
         console.log("database successfully connected")
     }
     catch(err){
         console.log("error in db",err.message)
     }
}

export default db;