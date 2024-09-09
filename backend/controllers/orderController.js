import orderModel from "../models/orderModel.js";
// Place Order for frontend
const placeOrder = async (req, res) => {
  // const frontend_url = "http://localhost:5173";
  const frontend_url = process.env.FRONTEND_URL;

  try {
    // Creating a New Order from orderModel
    const newOrder = new orderModel({
      userId: req.body.userId, //userId will be received from Auth-M.
      orderItems: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    // Saving the received order in the DB
    await newOrder.save();
    res.json({
      success: true,
      message: "Order Placed!",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error!",
    });
  }
};

// When payment is success/cancel then verifying the order payment
// const verifyOrder = async (req, res) => {
//   // fetching the orderId and success from req.body
//   const { orderId, success } = req.body;

//   try {
//     // Payment Successful
//     if (success == "true") {
//       await orderModel.findByIdAndUpdate(orderId, { payment: true });
//       res.json({ success: true, message: "Paid!" });
//     }
//     // Payment Canceled then deleting the order from DB
//     else {
//       await orderModel.findByIdAndDelete(orderId);
//       res.json({ success: false, message: "Not Paid!" });
//     }
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "Error!" });
//   }
// };

// User's order API for frontend
const userOrders = async (req, res) => {
  try {
    // Find all order of particular user
    const userId = req.body.userId;
    const orders = await orderModel.find({ userId});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error!" });
  }
};

// Listing orders for admin panel
// API to fetch all the orders details of all users.
const listOrders = async (req, res) => {
  try {
    // accessing all the order's data in the orders var
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error!" });
  }
};

// API for updating order status
const updateStatus = async (req, res) => {
  try {
    // Finding the order using Id, then updating the status value
    await orderModel.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status,
    });
    res.json({ success: true, message: "Status Updated!" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error!" });
  }
};

export { placeOrder,  userOrders, listOrders, updateStatus };
