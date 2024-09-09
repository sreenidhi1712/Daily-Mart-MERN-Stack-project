import express from "express";
import {
  addToCart,
   removeFromCart, 
   getCart,
   increment
   ,decrement,
   clearCart

} from "../controllers/cartController.js";
import authMiddleware from "../middleware/auth.js";

const cartRouter = express.Router();

cartRouter.post("/add", authMiddleware, addToCart);
cartRouter.post("/remove", authMiddleware, removeFromCart);
cartRouter.post("/get", authMiddleware, getCart);
cartRouter.post("/increment", authMiddleware, increment);
cartRouter.post("/decrement", authMiddleware, decrement);
cartRouter.post("/clear", authMiddleware, clearCart);



export default cartRouter;
