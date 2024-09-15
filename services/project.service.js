const { Skill, Project } = require("../models/model");
const mongoose = require("mongoose");

const createProject = async (projectData) => {
    try {
        const { title, description, projectUrl, imageUrl, skills } = projectData;  // Ensure 'skills' is destructured from projectData
        console.log(title, description, projectUrl, skills, imageUrl);

        // Create a new project instance
        const newProject = new Project({
            title: title,
            description: description,
            skills: skills,  // Store only the skill IDs in the project
            imageUrl: imageUrl,
            projectUrl: projectUrl
        });

        // Save the project to the database
        await newProject.save();
        return newProject;
    } catch (error) {
        console.error("Error creating project:", error);
        throw error;
    }
}

module.exports = { createProject };
