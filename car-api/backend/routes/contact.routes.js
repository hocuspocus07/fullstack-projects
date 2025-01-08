import { Router } from 'express';
import { postMessage } from '../controllers/contact.controller.js';

const contactRouter=Router();
contactRouter.post('/',postMessage);

export {contactRouter};
