import menus from "../models/menumodel.js"


export const menuGet=async(req,res)=>{
      try {
    const items = await menus.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch menu data' });
  }
}
export const menuAdd=async(req,res)=>{
   const {name,price,description,image}=req.body;
   try{
    if(!name || !price || !description||!image) 
            return res.status(400).json({message:"all fields are required"});
       
            const user=await menus.findOne({name,price,description,image})
             if(user)  return res.status(400).json({message:"product already exist"});
            
             menus.create({
                name,
                price,
                description,
                image
               
             })
             res.status(201).json({message:"successful add product"});
            }
            catch(err){
              res.status(500).json({message:"Internal server Error"});
              console.log("error in menu controller",err.message);
            }


   }
 export const menuUpdate=async(req,res)=>{
    const {id}=req.params;
    const {name,price,description,image}=req.body;
    try{
       const menuItem=await menus.findByIdAndUpdate(id,{
        name,
        price,description,
        image
       })
       res.status(201).json({message:"successful update product"});

    }
    catch(err){
      res.status(500).json({message:"Internal server Error"});
      console.log("error in menu controller",err.message);
    }
 }
 export const menuDelete=async(req,res)=>{
    const {id}=req.params;
    
    try{
       const menuItem=await menus.findByIdAndDelete(id)
    
       res.status(201).json({message:"successful deltete product"});

    }
    catch(err){
      res.status(500).json({message:"Internal server Error"});
      console.log("error in menu controller",err.message);
    }
 }
