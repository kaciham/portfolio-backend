const express = require('express');
const router = express.Router();
const skillController = require("../controllers/skill.controller")
const jobController = require("../controllers/job.controller")
const projectController = require("../controllers/project.controller")
const portfolioController = require("../controllers/portfolio.controller")
const contactController = require("../controllers/contact.controller")
const uploadAndOptimizeImage = require("../middlewares/multer-config-logo")
const uploadAndOptimizeImageProject = require("../middlewares/multer-config-imageUrl");
const uploadAndOptimizeImagePortfolio = require('../middlewares/multer-config-profilePic')
// const uploadPdf = require('../middlewares/pdf')

router.post("/skills", uploadAndOptimizeImage, skillController.createSkill)
router.post("/jobs", jobController.createJob)
router.post("/projects", uploadAndOptimizeImageProject, projectController.createProject)
router.post("/portfolios", uploadAndOptimizeImagePortfolio, portfolioController.createPortfolio)
router.post("/contacts", contactController.sendContactEmail)

router.get("/kaci", portfolioController.getPortfolioByMail)

router.put("/portfolios/:id", uploadAndOptimizeImagePortfolio, portfolioController.updatePortfolio);
router.put("/skills/:id", skillController.updateSkill)
router.put("/projects/:id", projectController.updateProject)

router.delete("/portfolios/:id", portfolioController.deletePortfolio);
router.delete("/skills/:id", skillController.deleteSkill)

module.exports = router;            