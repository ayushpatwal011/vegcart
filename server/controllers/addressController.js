import Address from "../models/Address.js";


// Add address : /api/address/add
export const addAddress = async (req, res) => {
  try {
    const { userId, address } = req.body;

    console.log("Request Body:", req.body);

    if (!userId || !address) {
      return res.status(400).json({ success: false, message: "Missing userId or address" });
    }

    // Ensure all required fields are there
    const requiredFields = [
      "firstName", "lastName", "street", "city", "state",
      "pincode", "country", "phone"
    ];

    const missingFields = requiredFields.filter(field => !address[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({ 
        success: false,
        message: `Missing fields: ${missingFields.join(", ")}` 
      });
    }

    // Proceed to save
    await Address.create({ ...address, userId });

    res.status(200).json({ 
      success: true,
      message: "Address added successfully"
    });
  } catch (error) {
    console.error("Add address error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
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
