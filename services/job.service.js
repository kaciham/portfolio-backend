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

const getAllJobs = async () => {
    try {
        const jobs = await Job.find({});
        return jobs;
    } catch (error) {
        console.error("Error getting jobs:", error);
        throw error;
    }
}

const updateJob = async (jobId, jobData) => {
    try {
        const job = await Job.findById(jobId);
        if (!job) {
            throw new Error('Job not found');
        }
        const { title } = jobData;
        if (title !== undefined) job.title = title;
        await job.save();
        return job;
    } catch (error) {
        console.error("Error updating job:", error);
        throw error;
    }
}

const deleteJob = async (jobId) => {
    try {
        const toDeleteJob = await Job.findById(jobId);
        if (!toDeleteJob) {
            throw new Error("Job not found");
        }
        await toDeleteJob.deleteOne();
    } catch (error) {
        console.error("Error deleting job:", error);
        throw error;
    }
}

module.exports = { createJob, getAllJobs, updateJob, deleteJob }