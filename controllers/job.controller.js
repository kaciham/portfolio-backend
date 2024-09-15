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

module.exports = {
    createJob
}