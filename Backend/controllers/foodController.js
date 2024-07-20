import foodModel from "../models/foodModel.js";
import fs from 'fs';

// Add food item
const addFood = async (req, res) => {
    if (!req.file || !req.body.name || !req.body.description || !req.body.price || !req.body.category) {
        return res.status(400).json({
            success: false,
            message: "Missing required fields..!"
        });
    }

    const imageFilename = req.file.filename;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: imageFilename
    });

    try {
        await food.save();
        res.json({
            success: true,
            message: "Food added..!"
        });
    } catch (error) {
        console.error("Error details:", error.message); 
        res.status(500).json({
            success: false,
            message: "Error adding food item..!",
            error: error.message 
        });
    }
};

//list foods
const listFood=async(req,res)=>{
    try {
        const foods=await foodModel.find({});
        res.json({
            success:true,
            data:foods
        })
    } catch (error) {
        console.log(error)
        res.json({
            success:false,
            message:"Error..!"
        })
    }
}

//remove foods
const removeFood=async(req,res)=>{
    try {
        const food=await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{})
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({
            success:true,
            messsage:"Food removed..!"
        })
    } catch (error) {
        console.log(error)
        res.json({
            success:false,
            message:"Error..!"
        })
    }
}

export { addFood,listFood,removeFood };
