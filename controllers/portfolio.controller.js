const portfolioService = require("../services/portfolio.service")

const createPortfolio = async (req, res) => {
    try {
        const portfolioData = {
            ...req.body,
            profilePic: req.files?.profilePic ? `imagesPortfolio/${req.files.profilePic[0].filename}` : null,
            resumePdf: req.files?.resumePdf ? `pdf/${req.files.resumePdf[0].filename}` : null
        };
        console.log(req.body);
        console.log(portfolioData);

        const newPortfolio = await portfolioService.createPortfolio(portfolioData);
        res.status(201).json(newPortfolio);
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({ message: "Validation Error", details: error.errors });
        } else {
            return res.status(500).json({ message: "Internal Server Error", error });
        }
    }
};


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
            return res.status(500).json({ message: "Internal <Serv></Serv>er Error" });
        }
    }
}

const updatePortfolio = async (req, res) => {
    try {
        id = req.params.id;
        const portfolioData = {
            ...req.body,
            profilePic: req.file ? `imagesPortfolio/${req.file.filename}` : null,
            resumePdf: req.file ? `resumes/${req.file.filename}` : null 
        };
        const portfolio = await portfolioService.updatePortfolio(id, portfolioData);
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
    createPortfolio, getPortfolioByMail, updatePortfolio, deletePortfolio
}