const pdfParse = require("pdf-parse")
const generateInterviewReport = require("../services/ai.service")
const interviewReportModel = require("../models/interviewReport.model")


/**
 * @description Generate new interview report on the basis of user self description,
    resume pdf and job description
 * @route POST /api/interview/
 * @access Private
 */
async function generateInterviewReportController(req, res) {
    try {
        const resumeFile = req.file;
        if (!resumeFile) {
            return res.status(400).json({
                success: false,
                message: "Resume file is required"
            });
        }

        const data = await pdfParse(resumeFile.buffer);
        const resumeText = data.text;
        const { selfDescription, jobDescription } = req.body;  

        let interViewReportByAi = await generateInterviewReport({
            resume: resumeText,
            selfDescription,
            jobDescription
        });
        
        const interviewReport = await interviewReportModel.create({
            user: req.user._id,
            resume: resumeText,
            selfDescription,
            jobDescription,
            title: interViewReportByAi.title || "Interview Preparation Report",
            ...interViewReportByAi
        });

        res.status(200).json({
            success: true,
            message: "Interview report generated successfully",
            interviewReport
        });
    } catch (error) {
        console.error("Interview Controller Error:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Failed to generate interview report"
        });
    }
}



/**
 * @description Get interview report by interview id
 */
async function getInterviewReportByIdController(req, res) {
    try {
        const { interviewId } = req.params;
        const interviewReport = await interviewReportModel.findOne({_id: interviewId, user: req.user._id});

        if (!interviewReport) {
            return res.status(404).json({
                success: false,
                message: "Interview report not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Interview report fetched successfully",
            interviewReport
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}



/**
 * @description Get all interview reports of logged in user
 */
async function getAllInterviewReportsController(req, res) {
    try {
        const interviewReports = await interviewReportModel.find({ user: req.user._id }).sort({ createdAt: -1 }).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")


        res.status(200).json({
            success: true,
            interviewReports
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = {
    generateInterviewReportController,
    getInterviewReportByIdController,
    getAllInterviewReportsController
};