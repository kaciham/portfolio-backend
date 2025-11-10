const { Skill } = require("../models/model");

const createSkill = async (skillData) => {
    try {
        const { name, logo,category } = skillData;
        const newSkill = new Skill({
            name,
            logo,
            category
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
        const { name, logo, category } = skillData

        if (name !== undefined) skill.name = name;
        if (logo !== undefined) skill.logo = logo;
        if (category !== undefined) skill.category = category;
        console.log(skill)
        await skill.save();
        return skill

    } catch (error) {

    }
}
const deleteSkill = async (skillId) => {
    try {
        const toDeleteSkill = await Skill.findById(skillId);
        if (!toDeleteSkill) {
            throw new Error("Skill not found");
        }
        await toDeleteSkill.deleteOne();
    } catch (error) {
        console.error("Error deleting skill:", error);
        throw error;
    }
}

const getAllSkills = async () => {
    try {
        const skills = await Skill.find({});
        return skills;
    } catch (error) {
        console.error("Error getting skills:", error);
        throw error;
    }
}

module.exports = {
    createSkill, updateSkill, deleteSkill, getAllSkills
}