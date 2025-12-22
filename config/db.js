import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://mukeshstalwartsoft_db_user:mukesh12345@cluster0.a9mmjbm.mongodb.net",
      {
        serverSelectionTimeoutMS: 5000,
      }
    );
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
