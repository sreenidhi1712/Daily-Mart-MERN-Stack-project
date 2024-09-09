import userModel from "../models/userModel.js";

// Add items to user cart
const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = userData.cartData || [];
    const newCartItems = req.body.cart;

    // Extract existing item IDs
    const existingItemIds = cartData.map(item => item.item);

    // Filter out new items that already exist in cartData
    const filteredNewItems = newCartItems.filter(item => !existingItemIds.includes(item.item));

    // Push only the filtered new items to the existing cart data
    cartData.push(...filteredNewItems);

    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Added to cart" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error!" });
  }
};

// Remove items from user cart
const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = userData.cartData || [];

    const itemIndex = cartData.findIndex(cartItem => cartItem.item === req.body.itemId);

    if (itemIndex !== -1) {
      cartData.splice(itemIndex, 1);
    }

    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Removed from cart" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error!" });
  }
};

// Fetch user cart data
const getCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = userData.cartData;
    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error!" });
  }
};

// Increment quantity of an item in user cart
const increment = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = userData.cartData || [];

    const itemIndex = cartData.findIndex(cartItem => cartItem.item === req.body.itemId);

    if (itemIndex !== -1) {
      cartData[itemIndex].quantity += 1;
      await userModel.findByIdAndUpdate(req.body.userId, { cartData });
      res.json({ success: true, message: "Quantity updated" });
    } else {
      res.json({ success: false, message: "Item not found in cart" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error!" });
  }
};

// Decrement quantity of an item in user cart
const decrement = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = userData.cartData || [];

    const itemIndex = cartData.findIndex(cartItem => cartItem.item === req.body.itemId);

    if (itemIndex !== -1) {
      if (cartData[itemIndex].quantity > 1) {
        cartData[itemIndex].quantity -= 1;
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Quantity updated" });
      } else if (cartData[itemIndex].quantity === 1) {
        cartData.splice(itemIndex, 1);
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Quantity updated" });
      }
    } else {
      res.json({ success: false, message: "Item not found in cart" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error!" });
  }
};

// Clear all items from user cart
const clearCart = async (req, res) => {
  try {
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: [] });
    res.json({ success: true, message: "Cart cleared" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error!" });
  }
};

export { addToCart, removeFromCart, getCart, increment, decrement, clearCart };