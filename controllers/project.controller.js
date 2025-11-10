const projectService = require("../services/project.service")

const createProject = async (req, res) => {
    try {
        const projectData = {
            ...req.body,
            skills: req.body.skills ? JSON.parse(req.body.skills) : [],
            imageUrl: req.file ? `imagesProject/${req.file.filename}` : null
        }
        const newProject = await projectService.createProject(projectData);
        res.status(201).json(newProject);
    } catch (error) {
        console.error("Error in createProject controller:", error);
        if (error.name === "ValidationError") {
            return res.status(400).json({ message: "Validation Error", details: error.errors });
        } else {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
}

const updateProject = async (req,res) => {
    try {
        const id = req.params.id;
        const projectData = {
            ...req.body,
            skills: req.body.skills ? JSON.parse(req.body.skills) : undefined,
            imageUrl: req.file ? `imagesProject/${req.file.filename}` : undefined
        }

        const project = await projectService.updateProject(id, projectData);
        res.status(200).json({ "message": "Project updated", project });
    } catch (error) {
        console.error("Error in updateProject controller:", error);
        if (error.name === "ValidationError") {
            return res.status(400).json({ message: "Validation Error", details: error.errors });
        } else {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
}

const getAllProjects = async (req, res) => {
    try {
        const projects = await projectService.getAllProjects();
        res.status(200).json(projects);
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const deleteProject = async (req, res) => {
    try {
        const id = req.params.id;
        const project = await projectService.deleteProject(id);
        res.status(200).json({ "message": "Project deleted", project });
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({ message: "Validation Error", details: error.errors });
        } else {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
}

module.exports = { createProject, updateProject, getAllProjects, deleteProject }