const { Skill } = require("../models/model");

const createSkill = async (skillData) => {
    try {
        const { name, logo } = skillData;
        const newSkill = new Skill({
            name,
            logo
        })
        await newSkill.save()
        return newSkill;
    } catch (error) {
        console.error("Error creating skill:", error);
        throw error;
    }

}

const updateSkill = async (skillId, skillData) => {
    try {
        const skill = await Skill.findById(skillId);
        if (!skill) {
            throw new Error('skill not found')
        }
        const { name, logo } = skillData

        if (name !== undefined) skill.name = name;
        if (logo !== undefined) skill.logo = logo;
        console.log(skill)
        await skill.save();
        return skill

    } catch (error) {

    }
}
const deleteSkill = async (skillId) => {
    try {
        const toDeleteSkill = Skill.findById(skillId);
        if (!toDeleteSkill) {
            throw new Error("Skill not found");
        }
        await toDeleteSkill.remove();
    } catch (error) {
        console.error("Error deleting skill:", error);
        throw error;
    }
}

module.exports = {
    createSkill, updateSkill, deleteSkill
}