
import bcrypt from "bcrypt";
import { generateToken } from "./utils.js";
import User from "../models/user.model.js"
import Admin from "../models/admin.model.js";




export const signup=async (req,res)=>{
  
  const {fullName,email,password}=req.body;
  try{ 
    if(!fullName || !email || !password) 
        return res.status(400).json({message:"all fields are required"});
        if(password.length<6){
            return res.status(400).json({message:"Password is must be at least 6 characters"});

        }
        const user=await User.findOne({email})
         if(user)  return res.status(400).json({message:"Email already exist"});
         const salt=await bcrypt.genSalt(10);
         const hashedPassword=await bcrypt.hash(password,salt);
         const  newUser=new User({
            fullName,
            email,
            password:hashedPassword
         })
         if(newUser){
            generateToken(newUser._id,res)
            await newUser.save();
            res.status(201).json({
                fullName:newUser.fullName,
                email:newUser.email,
              
            })
         }else{
             return res.status(400).json({message:"Invalid User"});
         }
        
        }
        catch(err){
            console.log("Error in signup controller",err.message)
            res.status(500).json({message:"Internal server Error"});
        }
}
export const login=async (req,res)=>{
    const {email,password}=req.body;
    try{
         const user=await User.findOne({email})
         if(!user)
         {
            return res.status(400).json({message:"Invalid credentials"})
         }
         const  isPasssword =await bcrypt.compare(password,user.password)
          if(!isPasssword)
          {
            return res.status(400).json({message:"Invalid credentials"});

          }
           generateToken(user._id,res)
           res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            profilePic:user.profilePic
           });


    }catch(err){
        console.log("err is log in controller",err.message);
        res.status(500).json({message:"Internal Server"});

    }
    
};
export const logout=(req,res)=>{
    try{
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"Logged out successfully"});

    }catch(err)
    {
          console.log("err is log in controller",err.message);
        res.status(500).json({message:"Internal Server"});

    }
}
export const adminlogin=async (req,res)=>{
    const {email,password}=req.body;
    try{
         const user=await Admin.findOne({email})
         if(!user)
         {
            return res.status(400).json({message:"Invalid credentials"})
         }
         const  isPasssword =await bcrypt.compare(password,user.password)
          if(!isPasssword)
          {
            return res.status(400).json({message:"Invalid credentials"});

          }
           generateToken(user._id,res)
           res.status(200).json({
            _id:user._id,
         
            email:user.email,
        
           });


    }catch(err){
        console.log("err is log in controller",err.message);
        res.status(500).json({message:"Internal Server"});

    }
    
};
export const adminlogout=(req,res)=>{
    try{
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"Logged out successfully"});

    }catch(err)
    {
          console.log("err is log in controller",err.message);
        res.status(500).json({message:"Internal Server"});

    }
}