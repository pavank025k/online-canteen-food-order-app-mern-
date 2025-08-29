import express from 'express';

import { configDotenv } from 'dotenv';
import db from "./lib/db.js";
import menus from './models/menumodel.js';
import Admin from './models/admin.model.js'
import bcrypt from "bcrypt";
import { generateToken } from './controllers/utils.js';
const app=express();
app.use(express.json());


configDotenv();
const menuData = [
  {
    id: 1,
    name: 'Paneer Butter Masala',
    description: 'Rich creamy paneer curry with butter and spices',
    price: 180,
    image: 'https://aartimadan.com/wp-content/uploads/2023/11/Paneer-Butter-Masala-Restaurant-Style.jpg',
  },
  {
    id: 2,
    name: 'Chicken Biryani',
    description: 'Fragrant basmati rice with spicy chicken masala',
    price: 220,
    image: 'https://www.shutterstock.com/image-photo/hyderabadi-chicken-biryani-aromatic-flavorful-260nw-2497040151.jpg',
  },
  {
    id: 3,
    name: 'Veg Burger',
    description: 'Delicious burger with fresh vegetables and patty',
    price: 90,
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YnVyZ2VyfGVufDB8fDB8fHww',
  },
  {
    id: 4,
    name: 'Masala Dosa',
    description: 'South Indian dosa stuffed with spicy potato',
    price: 70,
    image: 'https://cdn.prod.website-files.com/660a54774dc4e5855645ccfc/666163c9731fbb48af21267d_Plain%20Dosa.jpg',
  },
  {
    id: 5,
    name: 'Cold Coffee',
    description: 'Chilled coffee with ice cream and chocolate',
    price: 60,
    image: 'https://img.freepik.com/premium-photo/iced-coffee-roasted-coffee-wood-table_36078-57.jpg?semt=ais_hybrid&w=740'
  },
  {
    id: 6,
    name: 'Samosa',
    description: 'Crispy snack with spiced potato filling',
    price: 20,
    image: 'https://t4.ftcdn.net/jpg/05/11/08/05/360_F_511080597_NvqjRdezlARSQHy4VpAKFvUVTEeGdlLy.jpg',
  },
  {
    id: 7,
    name: 'Butter Naan',
    description: 'Soft naan coated with butter, perfect with curry',
    price: 30,
    image: 'https://fullofplants.com/wp-content/uploads/2023/05/Homemade-Naan-Bread-Restaurant-Style-Vegan-thumb-1.jpg'
  },
  {
    id: 8,
    name: 'Chocolate Cake Slice',
    description: 'Moist chocolate cake with creamy frosting',
    price: 50,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBnfTXs9DpaPffvPTpjsS2XrGmEqiS1PebKA&s',
  },
];

const menuss=Admin;

app.post('/admin_add',async(req,res)=>{
    const {email,password}=req.body;
      try{ 
        if( !email || !password) 
            return res.status(400).json({message:"all fields are required"});
            if(password.length<6){
                return res.status(400).json({message:"Password is must be at least 6 characters"});
    
            }
            const user=await menuss.findOne({email})
             if(user)  return res.status(400).json({message:"Email already exist"});
             const salt=await bcrypt.genSalt(10);
             const hashedPassword=await bcrypt.hash(password,salt);
             const  newUser=new menuss({
                
                email,
                password:hashedPassword
             })
             if(newUser){ 
                generateToken(newUser._id,res)
                await newUser.save();
                res.status(201).json({
                    
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
})




app.listen(process.env.PORT,()=>{
    console.log("Server connected successfully");
    db();
})



