const portfolioService = require("../services/portfolio.service")

const createPortfolio = async (req, res) => {
    try {
        const portfolioData = {
            ...req.body,
            skills: req.body.skills ? JSON.parse(req.body.skills) : [],
            projects: req.body.projects ? JSON.parse(req.body.projects) : [],
            jobs: req.body.jobs ? JSON.parse(req.body.jobs) : [],
            profilePic: req.files?.profilePic ? `imagesPortfolio/${req.files.profilePic[0].filename}` : null,
            resumePdf: req.files?.resumePdf ? `pdf/${req.files.resumePdf[0].filename}` : null
        };
        console.log(req.body);
        console.log(portfolioData);

        const newPortfolio = await portfolioService.createPortfolio(portfolioData);
        res.status(201).json(newPortfolio);
    } catch (error) {
        console.error("Error in createPortfolio controller:", error);
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
        const id = req.params.id;
        const portfolioData = {
            ...req.body,
            skills: req.body.skills ? JSON.parse(req.body.skills) : undefined,
            projects: req.body.projects ? JSON.parse(req.body.projects) : undefined,
            jobs: req.body.jobs ? JSON.parse(req.body.jobs) : undefined,
            profilePic: req.files?.profilePic ? `imagesPortfolio/${req.files.profilePic[0].filename}` : undefined,
            resumePdf: req.files?.resumePdf ? `pdf/${req.files.resumePdf[0].filename}` : undefined
        };
        const portfolio = await portfolioService.updatePortfolio(id, portfolioData);
        res.status(200).json({ "message": "Portfolio updated", portfolio });
    } catch (error) {
        console.error("Error in updatePortfolio controller:", error);
        if (error.name === "ValidationError") {
            return res.status(400).json({ message: "Validation Error", details: error.errors });
        } else {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
}

const deletePortfolio = async (req, res) => {
    try {
        const id = req.params.id;
        const deletePortfolio = await portfolioService.deletePortfolio(id);
        res.status(200).json({ "message": "Portfolio deleted" });
    } catch (error) {
        console.error("Error in deletePortfolio controller:", error);
        if (error.name === "ValidationError") {
            return res.status(400).json({ message: "Validation Error", details: error.errors });
        } else {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
}

const getAllPortfolios = async (req, res) => {
    try {
        const portfolios = await portfolioService.getAllPortfolios();
        res.status(200).json(portfolios);
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = {
    createPortfolio, getPortfolioByMail, updatePortfolio, deletePortfolio, getAllPortfolios
}