const jobService = require("../services/job.service")

const createJob = async (req, res) => {
    try {
        const jobData = req.body;
        const newJob = await jobService.createJob(jobData);
        res.status(201).json(newJob);
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({ message: "Validation Error", details: error.errors });
        } else {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
}

const getAllJobs = async (req, res) => {
    try {
        const jobs = await jobService.getAllJobs();
        res.status(200).json(jobs);
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const updateJob = async (req, res) => {
    try {
        const id = req.params.id;
        const jobData = req.body;
        const job = await jobService.updateJob(id, jobData);
        res.status(200).json({ "message": "Job updated", job });
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({ message: "Validation Error", details: error.errors });
        } else {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
}

const deleteJob = async (req, res) => {
    try {
        const id = req.params.id;
        const job = await jobService.deleteJob(id);
        res.status(200).json({ "message": "Job deleted", job });
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({ message: "Validation Error", details: error.errors });
        } else {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
}

module.exports = {
    createJob, getAllJobs, updateJob, deleteJob
}