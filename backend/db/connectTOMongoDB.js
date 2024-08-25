import mongoose from "mongoose";

const connectToMongoDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_DB_URI );
        console.log("commected to mongodb")
    } catch (error){
        console.log("Error", error.message); 
    }
}

export default connectToMongoDB;