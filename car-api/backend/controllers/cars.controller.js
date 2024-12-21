import { Car } from "../models/cars.models.js";

const getCars = async(req, res) => {
    try {
        const filters = {...req.query };
        delete filters.apiKey;
        console.log("Filters being used in the query:", filters);
        const cars = await Car.find(filters);
        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export { getCars };