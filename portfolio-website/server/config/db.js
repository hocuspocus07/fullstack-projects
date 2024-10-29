import dotenv from "dotenv"
import mongoose from "mongoose"
dotenv.config()
const connectDb = async() => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`);
        console.log(`mongodb connected! db host: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log(error)
        process.exit(1);
    }
}
export default connectDb;