import { Contact } from "../models/contact.models.js";


const getContact = async(req, res) => {
    const contacts = await Contact.find();
    res.json(contacts);
};

const addContact = async(req, res) => {
    try {
        const { name, email, phone, message, company } = req.body;

        const newContact = new Contact({
            name,
            email,
            phone,
            message,
            company,
        });

        await newContact.save();

        res.status(201).json({
            success: true,
            message: "Contact added successfully!",
            contact: newContact,
        });
    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Error adding contact: " + error.message,
        });
    }
};



const deleteContact = async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (contact) {
        await contact.deleteOne();
        res.json({ message: "contact removed" });
    } else {
        res.status(404).json({ message: "no such contact was found" });
    }
}
export { getContact, addContact, deleteContact };