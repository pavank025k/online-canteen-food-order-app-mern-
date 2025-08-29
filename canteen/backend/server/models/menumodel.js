import mongoose  from "mongoose";
const menuSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    }
    ,
    description:{
        type:String,
         required:true
    },
    price:{
        type:Number,
         required:true
    },
    image:{
        type:String,
         required:true
    }
 
},{timestamps:true});
const menus=mongoose.model("menuitems",menuSchema)
export default menus
