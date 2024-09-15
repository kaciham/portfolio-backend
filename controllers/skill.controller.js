const skillService = require("../services/skill.service");

const createSkill = async (req, res) => {
    try {
        const skillData = {
            ...req.body,
            logo: req.file ? `images/${req.file.filename}` : null
        }
        const newSkill = await skillService.createSkill(skillData);
        res.status(201).json({ "message": "Skill has been created", "skill": newSkill })
    } catch (error) {
        console.error("Error creating skill:", error);

        // Send appropriate error response
        if (error.name === "ValidationError") {
            return res.status(400).json({ message: "Validation Error", details: error.errors });
        } else {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
}

const updateSkill = async (req, res) => {
    try {
        const id = req.params.id;
        const skillData = {
            ...req.body,
            logo: req.file ? `images/${req.file.filename}` : null
        }
        console.log(req.file)
        console.log(skillData)

        const skill = await skillService.updateSkill(id, skillData)
        res.status(200).json({ "message": "Skill updated", skill });
    } catch (error) {
        console.error("Error updating skill:", error);

        // Send appropriate error response
        if (error.name === "ValidationError") {
            return res.status(400).json({ message: "Validation Error", details: error.errors });
        } else {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
}

module.exports = {
    createSkill, updateSkill
}