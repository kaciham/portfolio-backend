const projectService = require("../services/project.service")

const createProject = async (req, res) => {
    try {
        const projectData = {
            ...req.body,
            imageUrl: req.file ? `imagesProject/${req.file.filename}` : null
        }
        const newProject = await projectService.createProject(projectData);
        res.status(201).json(newProject);
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({ message: "Validation Error", details: error.errors });
        } else {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
}

module.exports = { createProject }