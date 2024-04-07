import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  clerkId: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
});

export default mongoose.models.users ?? mongoose.model("users", userSchema);
