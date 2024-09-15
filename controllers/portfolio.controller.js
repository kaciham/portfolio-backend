const portfolioService = require("../services/portfolio.service")

const createPorfolio = async (req, res) => {
    try {
        const portfolioData = {
            ...req.body,
            profilePic: req.file ? `imagesPortfolio/${req.file.filename}` : null
        }
        const newPorfolio = await portfolioService.createPortfolio(portfolioData);
        res.status(201).json(newPorfolio);
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({ message: "Validation Error", details: error.errors });
        } else {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
}

const getPortfolioByMail = async (req, res) => {
    try {
        const foundedEmail = await portfolioService.getPortfolioByMail();
        if (!foundedEmail) {
            return res.status(404).json({ message: "Portfolio not found" }); // Handle case where no portfolio is found
        }

        res.status(200).json(foundedEmail)
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({ message: "Validation Error", details: error.errors });
        } else {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
}

const updatePortfolio = async (req, res) => {
    try {
        id = req.params.id;
        const portfolioData = {
            ...req.body,
            profilePic: req.file ? `imagesPortfolio/${req.file.filename}` : null
        };
        const portfolio = await portfolioService.updatePorfolio(id, portfolioData);
        res.status(200).json({ "message": "Portfolio updated", portfolio });
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({ message: "Validation Error", details: error.errors });
        } else {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
}

const deletePortfolio = async (req, res) => {
    try {
        id = req.params.id;
        const deletePortfolio = await portfolioService.deletePorfolio(id);
        res.status(200).json({ "message": "Portfolio deleted" });
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({ message: "Validation Error", details: error.errors });
        } else {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
}

module.exports = {
    createPorfolio, getPortfolioByMail, updatePortfolio, deletePortfolio
}