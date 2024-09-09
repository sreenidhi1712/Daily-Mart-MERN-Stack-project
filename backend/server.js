import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import productRouter from "./routes/productRoute.js";
import userRouter from "./routes/userRoute.js";
import "dotenv/config";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import favouriteRouter from "./routes/favouriteRoute.js";

//app config
const app = express();
const port = process.env.PORT || 8000;

const corsOptions = {
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow GET, POST, PUT, DELETE requests
  allowedHeaders: '*', // Allow all headers
};


//middlewaree
app.use(cors(corsOptions));
app.use(express.json());

//DB connection
connectDB();

// API endpoints
app.use("/api/product", productRouter);
app.use("/images", express.static("uploads")); //access of uploaded images from uploads folder
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/favourite", favouriteRouter);

app.get("/", (req, res) => {
  res.send("API Working fine");
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}  `);
});
