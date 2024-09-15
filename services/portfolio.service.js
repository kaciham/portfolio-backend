const { Portfolio } = require("../models/model")

const createPortfolio = async (portfolioData) => {
    try {
        const { firstName, lastName, profilePic, title, bio, skills, projects, email, phone, linkedinUrl, githubUrl, jobs } = portfolioData
        const portfolio = new Portfolio({
            firstName, lastName, profilePic, title, bio, skills, projects, email, phone, linkedinUrl, githubUrl, jobs
        });
        await portfolio.save();
        return portfolio;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
}

const getPortfolioByMail = async () => {
    try {
        const foundedPorfolioByMail = await Portfolio.findOne({ email: "kacihamrounpro@gmail.com" })
            .populate({
                path: 'skills', // Populate the skills field
                select: 'name logo' // Only include the 'name' and 'logo' fields from Skill
            })
            .populate({
                path: 'projects', // Populate the projects field
                populate: { // Nested populate for skills within projects
                    path: 'skills',
                    select: 'name logo' // Include 'name' and 'logo' for skills within projects
                }
            })
            .populate({
                path: 'jobs',
                populate: 'title'
            });
        return foundedPorfolioByMail;
    } catch (error) {
        console.error("Error fetching porfolio:", error);
        throw error;
    }
}

const updatePorfolio = async (id, portfolioData) => {
    try {
        const portfolio = await Portfolio.findById(id);

        if (!portfolio) {
            throw new Error('Portfolio not found');
        }

        const { firstName, lastName, profilePic, bio, skills, projects, email, phone, linkedinUrl, githubUrl, jobs } = portfolioData;

        // Update the book's properties if they are provided
        if (firstName !== undefined) portfolio.firstName = firstName;
        if (lastName !== undefined) portfolio.lastName = lastName;
        if (profilePic !== undefined) portfolio.profilePic = profilePic;
        if (bio !== undefined) portfolio.bio = bio;
        if (skills !== undefined) portfolio.skills = skills;
        if (projects !== undefined) portfolio.projects = projects;
        if (email !== undefined) portfolio.email = email;
        if (phone !== undefined) portfolio.phone = phone;
        if (linkedinUrl !== undefined) portfolio.linkedinUrl = linkedinUrl;
        if (githubUrl !== undefined) portfolio.githubUrl = githubUrl;
        if (jobs !== undefined) portfolio.jobs = jobs;

        // Save the updated book
        await portfolio.save();

        // Return the updated book or some success response
        return portfolio;
    }
    catch (error) {
        console.error("Error updating porfolio:", error);
        throw error;
    }
}

const deletePorfolio = async (id) => {
    try {
        const foundPortfolio = await Portfolio.findById(id);
        await foundPortfolio.deleteOne();
    } catch (error) {
        console.error("Error fetching porfolio:", error);
        throw error;
    }
}
module.exports = { createPortfolio, getPortfolioByMail, updatePorfolio, deletePorfolio }