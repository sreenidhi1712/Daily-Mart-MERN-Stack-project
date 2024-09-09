import productModel from "../models/productModel.js";
import fs from "fs";

// Add food item func
// So whenever addFood api gets clicked, in the body sending these details and access it in the backend using this function
// Using add food api function, new food items can be added in DB.
const addProduct = async (req, res) => {
  let image_filename = `${req.file.filename}`;

  const product = new productModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });

  try {
    await product.save();
    res.json({ success: true, message: "Product Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error", error: error });
  }
};

// All food list func- so that it can be accessed and send them as response.
const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, data: products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Remove food item func-
const removeProduct = async (req, res) => {
  try {
    // Find the food model using the id
    const product = await productModel.findById(req.body.id);

    // removing from file system and uploads folder
    fs.unlink(`uploads/${product.image}`, () => {});

    // removing from DB
    await productModel.findByIdAndDelete(req.body.id);

    res.json({ success: true, message: "product Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { addProduct, listProduct, removeProduct };
