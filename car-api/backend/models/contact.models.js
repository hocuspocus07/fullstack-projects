import mongoose,{Schema} from "mongoose";

const contactSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
},{timestamps:true});

export const Contact = mongoose.model('Contact', contactSchema);
