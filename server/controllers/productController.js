import connectCloudinary from "../config/cloudinary.js";
import Product from "../models/Product.js"
import { v2 as cloudinary } from "cloudinary"

// Add Poduct:  /api/product/add
export const addProduct = async (req, res) => {
  try {
    let productData = JSON.parse(req.body.productData);
    const images = req.files;

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    await Product.create({ ...productData, image: imagesUrl });

    return res.status(200).json({
      success: true,
      message: "Product added successfully",
    });
  } catch (error) {
    console.error( error.message);
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


// Get Poduct:  /api/product/list
export const productList = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("Product List Error:", error.message);
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


// Get Single Product: /api/product/:id
export const productById = async (req, res) => {
  const { id } = req.body;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("Product By ID Error:", error.message);
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


// Change Product Stock: /api/product/stock
export const changeStock = async (req, res) => {
  const { id, inStock } = req.body;
  try {
    const product = await Product.findByIdAndUpdate(
      id,
      { inStock },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Stock status updated",
      product,
    });
  } catch (error) {
    console.error("Change Stock Error:", error.message);
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
