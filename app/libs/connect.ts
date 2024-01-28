import mongoose from "mongoose";
import { cache } from "react";

export const connect = cache(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("Connected to MongoDB");
  } catch (error) {
    throw new Error("Failed to connect to MongoDB");
  }
});
