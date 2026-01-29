import Service from "../models/Service.js";

export const createService = async (req, res) => {
    try {
        if (req.user.role !== "PROVIDER") {
            return res.status(403).json({ message: "Only providers can create services" });
        }

        const service = await Service.create({
            provider: req.user.id,
            ...req.body
        });

        res.status(201).json(service);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getMyServices = async (req, res) => {
    try {
        const services = await Service.find({ provider: req.user.id });
        res.json(services);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
