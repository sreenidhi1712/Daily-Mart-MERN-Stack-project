import mongoose from "mongoose";

const  orderItemSchema = new mongoose.Schema({
  item: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
});

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  orderItems: {
    type: [orderItemSchema],
    default: [],
  },
  amount: {
    type: Number,
    required: true,
  },
  address: {
    type: Object,
    required: true,
  },
  status: {
    type: String,
    default: "Items are getting packed",
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  payment: {
    type: Boolean,
    default: false,
  },
});

// Create the Model
const orderModel =
  mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;
