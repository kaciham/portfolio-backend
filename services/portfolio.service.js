const { Portfolio } = require("../models/model")

const createPortfolio = async (portfolioData) => {
    try {
        // Create an empty object to store portfolio data
        const portfolioFields = {};

        // Dynamically add fields if they are present in the portfolioData object
        if (portfolioData.firstName) portfolioFields.firstName = portfolioData.firstName;
        if (portfolioData.lastName) portfolioFields.lastName = portfolioData.lastName;
        if (portfolioData.profilePic) portfolioFields.profilePic = portfolioData.profilePic;
        if (portfolioData.title) portfolioFields.title = portfolioData.title;
        if (portfolioData.bio) portfolioFields.bio = portfolioData.bio;
        if (portfolioData.skills) portfolioFields.skills = portfolioData.skills;
        if (portfolioData.projects) portfolioFields.projects = portfolioData.projects;
        if (portfolioData.email) portfolioFields.email = portfolioData.email;
        if (portfolioData.phone) portfolioFields.phone = portfolioData.phone;
        if (portfolioData.linkedinUrl) portfolioFields.linkedinUrl = portfolioData.linkedinUrl;
        if (portfolioData.githubUrl) portfolioFields.githubUrl = portfolioData.githubUrl;
        if (portfolioData.jobs) portfolioFields.jobs = portfolioData.jobs;
        if (portfolioData.resumePdf) portfolioFields.resumePdf = portfolioData.resumePdf;
        if(portfolioData.scheduleUrl) portfolioFields.scheduleUrl = portfolioData.scheduleUrl

        // Create a new portfolio object with the dynamically populated fields
        const portfolio = new Portfolio(portfolioFields);

        // Save the portfolio in the database
        await portfolio.save();

        return portfolio;
    } catch (error) {
        console.error("Error creating Portfolio:", error);
        throw error;
    }
};


const getPortfolioByMail = async () => {
    try {
        const { Skill, Job, Project } = require("../models/model");

        // Get all data
        const skills = await Skill.find({});
        const jobs = await Job.find({});
        const projects = await Project.find({}).populate('skills', 'name logo category');
        const portfolios = await Portfolio.find({})
            .populate('skills', 'name logo category')
            .populate({
                path: 'projects',
                populate: {
                    path: 'skills',
                    select: 'name logo category'
                }
            })
            .populate('jobs', 'title');

        // Return all data in one response
        return {
            skills,
            jobs,
            projects,
            portfolios
        };
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}

const updatePortfolio = async (id, portfolioData) => {
    try {
        const portfolio = await Portfolio.findById(id);

        if (!portfolio) {
            throw new Error('Portfolio not found');
        }

        const { firstName, lastName, profilePic, bio, skills, projects, email, phone, linkedinUrl, githubUrl, jobs, resumePdf, scheduleUrl } = portfolioData;

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
        if(resumePdf !== undefined) portfolio.resumePdf = resumePdf;
        if(scheduleUrl !== undefined) portfolio.scheduleUrl = scheduleUrl;

        // Save the updated book
        await portfolio.save();

        // Return the updated book or some success response
        return portfolio;
    }
    catch (error) {
        console.error("Error updating portfolio:", error);
        throw error;
    }
}

const deletePortfolio = async (id) => {
    try {
        const foundPortfolio = await Portfolio.findById(id);
        await foundPortfolio.deleteOne();
    } catch (error) {
        console.error("Error fetching portfolio:", error);
        throw error;
    }
}

const getAllPortfolios = async () => {
    try {
        const portfolios = await Portfolio.find({})
            .populate('skills', 'name logo category')
            .populate({
                path: 'projects',
                populate: {
                    path: 'skills',
                    select: 'name logo category'
                }
            })
            .populate('jobs', 'title');
        return portfolios;
    } catch (error) {
        console.error("Error getting portfolios:", error);
        throw error;
    }
}

module.exports = { createPortfolio, getPortfolioByMail, updatePortfolio, deletePortfolio, getAllPortfolios }