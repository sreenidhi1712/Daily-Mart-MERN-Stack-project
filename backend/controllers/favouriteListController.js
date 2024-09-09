import userModel from "../models/userModel.js";

// Add items to user FavouriteList
const addToFavouriteList = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let favouriteData = userData.favouriteItem || [];
    const newFavouriteItems = req.body.favouriteItems;

    // Extract existing item IDs
    const existingItemIds = favouriteData.map(item => item.favouriteProduct);

    // Filter out new items that already exist in favouriteData
    const filteredNewItems = newFavouriteItems.filter(item => !existingItemIds.includes(item.favouriteProduct));

    // Push only the filtered new items to the existing favourite data
    favouriteData.push(...filteredNewItems);

    await userModel.findByIdAndUpdate(req.body.userId, { favouriteItem: favouriteData });
    res.json({ success: true, message: "Added to favourite" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error!" });
  }
};

// Remove item from user FavouriteList
const removeFromFavourite = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let favouriteData = userData.favouriteItem || [];

    const itemIndex = favouriteData.findIndex(favouriteItem => favouriteItem.favouriteProduct === req.body.itemId);

    if (itemIndex !== -1) {
      favouriteData.splice(itemIndex, 1);
    }

    await userModel.findByIdAndUpdate(req.body.userId, { favouriteItem: favouriteData });
    res.json({ success: true, message: "Removed from favourite" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error!" });
  }
};

export { addToFavouriteList, removeFromFavourite };