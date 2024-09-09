import express from "express";
import {
  addProduct, listProduct, removeProduct
} from "../controllers/productController.js";
import multer from "multer";

// Create Express Router
const productRouter = express.Router();

// Image Stroage Engine using the multer diskStorage method
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, callback) => {
    return callback(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

// Routes:
productRouter.post("/add", upload.single("image"), addProduct);
productRouter.get("/list", listProduct);
productRouter.post("/remove", removeProduct);

export default productRouter;
