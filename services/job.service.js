const { Job } = require("../models/model");

const createJob = async (jobData) => {
    try {
        const { title } = jobData;
        const newJob = new Job({
            title
        })
        await newJob.save();
        return newJob
    } catch (error) {
        console.error("Error creating job:", error);
        throw error;
    }
}

module.exports = { createJob }