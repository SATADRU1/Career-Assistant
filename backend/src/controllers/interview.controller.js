const pdfParse = require("pdf-parse")
const generateInterviewReport = require("../services/ai.service")
const interviewReportModel = require("../models/interviewReport.model")

async function generateInterviewReportController(req, res) {
    const resumeFile = req.file
    const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(resumeFile.buffer))).getText(); 
    const { selfDescription, jobDescription } = req.body;  

    let interViewReportByAi = await generateInterviewReport({
        resume: resumeContent.text,
        selfDescription,
        jobDescription
    });
    
    interViewReport = await interviewReportModel.create({
        user: req.user._id,
        resume: resumeContent.text,
        selfDescription,
        jobDescription,
        ...interViewReportByAi
    });

    res.status(200).json({
        success: true,
        message: "Interview report generated successfully",
        interViewReport
    });
}

module.exports = {
    generateInterviewReportController,
};