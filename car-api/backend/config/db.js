import dotenv from "dotenv"
import mongoose from "mongoose"
dotenv.config()
const connectDb = async() => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`);
        console.log("conencted!", connectionInstance.connection.host)
    } catch (error) {
        process.exit(1);
    }
}
export default connectDb;