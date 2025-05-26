import { v2 as cloudinay} from "cloudinary"

const connectCloudinary = async () => {
    cloudinay.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
        })
        console.log("cloudinary connected");
        
}

export default connectCloudinary;