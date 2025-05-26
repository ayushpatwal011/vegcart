import Address from "../models/Address.js";


// Add address : /api/address/add
export const addAddress = async (req, res) => {
    try {
        const { userId, address } = req.body;
        await Address.create({ ...address ,userId });
        
        res.status(200).json({ 
            success : true,
            message: "Address added successfully" });
    } catch (error) {
        console.error( error.message);
        res.status(500).json({
            success: false,
             message: error.message });
    }
};


// Get address : /api/address/get
export const getAddress = async (req, res) => {
    try {
        const { userId } = req.body;

        const addresses = await Address.find({ userId });
        res.status(200).json({ 
             success : true,
             addresses });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message});
    }
};
