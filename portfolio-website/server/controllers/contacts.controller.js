import { Contact } from "../models/contact.models.js";


const getContact = async(req, res) => {
    const contacts = await Contact.find();
    console.log(contacts);
    res.json(contacts);
};

const addContact = async(req, res) => {
    try {
        const { name, email, phone, message, company } = req.body;
        console.log(req.body); // Log incoming request body

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
        console.log(`Contact added: ${newContact}`);
    } catch (error) {
        console.error("Error adding contact:", error);

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
        console.log(`contact removed: ${contact}`);
        res.json({ message: "contact removed" });
    } else {
        res.status(404).json({ message: "no such contact was found" });
    }
}
export { getContact, addContact, deleteContact };