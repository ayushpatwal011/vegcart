import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import "dotenv/config"
import connectDB from "./config/db.js"
import userRouter from "./routes/userRoute.js"
import sellerRouter from "./routes/sellerRoute.js"
import connectCloudinary from "./config/cloudinary.js"
import productRouter from "./routes/productRoute.js"
import cartRouter from "./routes/cartRoute.js"
import addressRouter from "./routes/addressRoute.js"
import orderRouter from "./routes/orderRoute.js"
import { stripeWebhooks } from "./controllers/orderController.js"

const app = express()
const port = process.env.PORT || 4000

    await connectDB()
    await connectCloudinary()

// allow multiple origin
const allowOrigins = ["http://localhost:5173"]

app.post("/stripe", express.raw({type:"application/json"}), stripeWebhooks)

// Middleware config
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: allowOrigins,
    credentials: true
}))

app.get("/", (req,res) => {res.send("API is Working")})
app.use("/api/user", userRouter)
app.use("/api/seller", sellerRouter)
app.use("/api/product", productRouter)
app.use("/api/cart", cartRouter)
app.use("/api/address", addressRouter)
app.use("/api/order", orderRouter)

app.listen(port, async () => {

    console.log(`server id running on port = ${port}`);
})