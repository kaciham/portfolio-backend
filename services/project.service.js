const { Skill, Project } = require("../models/model");
const mongoose = require("mongoose");

const createProject = async (projectData) => {
    try {
        const { title, description, projectUrl, imageUrl, skills, problematic, solution } = projectData;  // Ensure 'skills' is destructured from projectData
        console.log(title, description, projectUrl, skills, imageUrl);

        // Create a new project instance
        const newProject = new Project({
            title: title,
            description: description,
            problematic: problematic,  // Ensure problematic is included
            solution: solution,  // Ensure solution is included
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

const updateProject = async (id, projectData) => {
    try {
        const project = await Project.findById(id);
        if(!project){
            throw new Error('Project not found');
        }

        const { title, description, projectUrl, imageUrl, skills } = projectData;
        if (title !== undefined) project.title = title;
        if (description !== undefined) project.description = description;
        if (projectUrl !== undefined) project.projectUrl = projectUrl;
        if (imageUrl !== undefined) project.imageUrl = imageUrl;
        if (skills !== undefined) project.skills = skills;
        if (problematic !== undefined) project.problematic = problematic;
        if (solution !== undefined) project.solution = solution;
        await project.save();
        return project

    } catch (error) {
        console.error("Error updating project:", error);
        throw error;
    }
}


module.exports = { createProject, updateProject };
