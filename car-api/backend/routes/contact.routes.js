import { postMessage } from '../controllers/contact.controller.js';

const contactRouter=Router();
contactRouter.post('/contact',postMessage);
