import express, { Router } from "express"
import { getCars } from "../controllers/cars.controller.js"
const carRouter = Router()

carRouter.get("/", getCars);

export { carRouter };