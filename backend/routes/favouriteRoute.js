import express from "express";
import {addToFavouriteList,removeFromFavourite} from "../controllers/favouriteListController.js"
import authMiddleware from "../middleware/auth.js";

const favouriteRouter = express.Router();

favouriteRouter.post("/add", authMiddleware, addToFavouriteList);
favouriteRouter.post("/remove", authMiddleware, removeFromFavourite);




export default favouriteRouter;
