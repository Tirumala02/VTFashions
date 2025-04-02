import userModel from "../models/userModel.js"
import mongoose from "mongoose"
// const generateGuestId = () => `guest_${crypto.randomBytes(8).toString('hex')}`;

// add products to user cart
// addToCart function (Backend)
const addToCart = async (req, res) => {
    try {
        const { itemId, size } = req.body;
        let userId = req.body.userId;

        let query = mongoose.Types.ObjectId.isValid(userId) ? { _id: userId } : { guestId: userId };

        let user = await userModel.findOne(query);

        if (!user) {
            if (!userId.startsWith("guest_")) {
                return res.status(404).json({ message: "User not found" });
            }
            user = await userModel.create({ guestId: userId, name: `Guest_${userId}`, userType: "guest" });
        }

        let cartData = user.cartData || {};

        if (!cartData[itemId]) {
            cartData[itemId] = {};
        }
        cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;

        await userModel.findOneAndUpdate(query, { cartData });

        res.status(200).json({ message: "Item added to cart!", guestId: userId });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// updateCart function (Backend)
const updateCart = async (req, res) => {
    try {
        const { userId, itemId, size, quantity } = req.body;

        let query = mongoose.Types.ObjectId.isValid(userId) ? { _id: userId } : { guestId: userId };

        let user = await userModel.findOne(query);
        if (!user) return res.status(404).json({ message: "User not found" });

        let cartData = user.cartData || {};
        if (cartData[itemId] && cartData[itemId][size] !== undefined) {
            cartData[itemId][size] = quantity;
        }

        await userModel.findOneAndUpdate(query, { cartData });

        res.json({ success: true, message: "Cart Updated" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// getUserCart function (Backend)
const getUserCart = async (req, res) => {
    try {
        const { userId } = req.body;
        console.log("Received userId:", userId);  // ✅ Debugging

        if (!userId) return res.status(400).json({ message: "Missing userId" });

        let query = mongoose.Types.ObjectId.isValid(userId)
            ? { _id: userId }
            : { guestId: userId };

        let user = await userModel.findOne(query);
        if (!user) return res.status(404).json({ message: "User not found using as guest" });

        res.json({ success: true, cartData: user.cartData });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};



export { addToCart, updateCart, getUserCart }