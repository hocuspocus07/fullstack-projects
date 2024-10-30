import express, { Router } from "express";
import { getContact, addContact, deleteContact } from "../controllers/contacts.controller.js";

const contactRouter = Router()
contactRouter.get("/", getContact);
contactRouter.post("/", addContact);
contactRouter.delete("/:id", deleteContact);

export default contactRouter;