import { Contact } from "../models/contact.models.js";


const getContact = async(req, res) => {
    const contacts = await Contact.find();
    console.log(contacts);
    res.json(contacts);
};

const addContact = async(req, res) => {
    const { name, email, phone, message, subject, date, status, company, attachments } = req.body;
    console.log(req.body);
    const newContact = new Contact({
        name,
        email,
        phone,
        message,
        subject,
        date,
        status,
        company,
        attachments,
    });
    await newContact.save();
    res.json(newContact);
    console.log(`contact added: ${newContact}`);
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