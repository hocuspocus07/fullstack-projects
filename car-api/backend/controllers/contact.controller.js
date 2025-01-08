import {Contact} from "../models/contact.models.js";

export const postMessage=async (req,res)=>{
    const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }
    try{
        const newContact = new Contact({ name, email, message });
        await newContact.save();
        res.status(201).json({ message: 'Your message has been sent successfully!' });
    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
}