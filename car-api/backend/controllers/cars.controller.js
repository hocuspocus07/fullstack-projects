import { Car } from "../models/cars.models.js";

const getCars = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const filters = { ...req.query };
        delete filters.apiKey;
        delete filters.page;
        delete filters.limit;

        const regexFilters = {};
        for (const key in filters) {
            regexFilters[key] = { $regex: filters[key], $options: "i" }; // 'i' for case-insensitivity
        }
        const cars = await Car.aggregate([
            { $match: regexFilters},
            { $skip: skip },
            { $limit: limit },
        ]);

        const totalCars = await Car.countDocuments(filters);

        res.status(200).json({
            totalResults: totalCars,
            totalPages: Math.ceil(totalCars / limit),
            currentPage: page,
            cars,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { getCars };