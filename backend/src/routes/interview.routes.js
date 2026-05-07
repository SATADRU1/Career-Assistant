const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware"); 
const interviewController = require("../controllers/interview.controller");
const { upload } = require("../middlewares/file.middleware");


const interviewRouter = express.Router();

//api creation
/**
 * @route POST /api/interview
 * @description Generate new interview report on the basis of user self description,
    resume pdf and job description
 * @access Private
 */
interviewRouter.post("/" , authMiddleware.authUser , upload.single("resume"), interviewController.generateInterviewReportController)


/**
 * @route GET /api/interview/report/:interviewId
 * @description Get interview report by interview id
 * @access Private
 */
interviewRouter.get("/report/:interviewId" , authMiddleware.authUser , interviewController.getInterviewReportByIdController)


/**
 * @route GET /api/interview
 * @description Get all interview reports of logged in user
 * @access Private
 */
interviewRouter.get("/", authMiddleware.authUser, interviewController.getAllInterviewReportsController)


module.exports = interviewRouter;  