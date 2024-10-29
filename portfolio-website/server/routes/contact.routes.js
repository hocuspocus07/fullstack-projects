import express, { Router } from "express";
import { Contact } from "../models/contact.models.js";

const contactRouter = Router()
contactRouter.post("/", async(req, res) => {
    try {
        const { name, email, message } = req.body;
        const newContact = new Contact({ name, email, message });
        await newContact.save();
        res.status(201).json({ message: "Message received" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
export default contactRouter;