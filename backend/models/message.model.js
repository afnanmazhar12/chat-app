import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  senderID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming your user model is named "User"
    required: true
  },
  receiverID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming your user model is named "User"
    required: true
  },
  message: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Message = mongoose.model("Message", messageSchema); // Corrected model name and schema

export default Message;
