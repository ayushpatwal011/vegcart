import jwt from "jsonwebtoken";

const authSeller = async (req, res, next) => {
  const { sellerToken } = req.cookies;
 

  if (!sellerToken) {
    return res.status(401).json({
      success: false,
      message: "Not Authorized: Token missing",
    });
  }

  try {
    const decoded = jwt.verify(sellerToken, process.env.JWT_SECRET);

    if (decoded.email === process.env.SELLER_EMAIL) {
      
      return next();
    } else {
      return res.status(401).json({
        success: false,
        message: "Not Authorized: Invalid seller",
      });
    }
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Token verification failed",
    });
  }
};

export default authSeller;
