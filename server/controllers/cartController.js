import User from "../models/User.js";


// Update user cart data: /api/cart/update
export const updateCart = async (req, res) => {
    try {
        const { userId, cartItems } = req.body;

        await User.findByIdAndUpdate(userId,{ cartItems });
        res.status(200).json({ 
            success : true,
            message: "Cart updated successfully" });

    } catch (error) {
        console.error("Error updating cart:", error);
        res.status(500).json({ 
            success : false,
            message: "Server error" });
    }
};
