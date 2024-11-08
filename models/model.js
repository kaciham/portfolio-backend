const mongoose = require('mongoose');

// Skill Schema
const SkillSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    logo: { type: String, required: true }
});

// Job 
const JobSchema = new mongoose.Schema({
    title: { type: String, required: true },
})

// Project Schema
const ProjectSchema = new mongoose.Schema({
    title: { type: String },
    description: { type: String },
    skills: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }],
    imageUrl: { type: String },
    projectUrl: { type: String }
});

// Portfolio Schema
const PortfolioSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    profilePic: { type: String },
    bio: { type: String },
    skills: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }],
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
    jobs: [{type: mongoose.Schema.Types.ObjectId, ref: 'Job'}],
    email: { type: String },
    phone: { type: String },
    linkedinUrl: { type: String },
    githubUrl: { type: String },
    scheduleUrl: { type: String },
    resumePdf: { type: String }
});

// Create models
const Skill = mongoose.model('Skill', SkillSchema);
const Project = mongoose.model('Project', ProjectSchema);
const Portfolio = mongoose.model('Portfolio', PortfolioSchema);
const Job = mongoose.model('Job', JobSchema)

module.exports = {
    Skill,
    Project,
    Portfolio,
    Job
};