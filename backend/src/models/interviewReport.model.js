const mongoose = require("mongoose");

/**
 * user input data :
 * - job description schema : [string]
 * - resume text : [string]
 * - self description : [string]
 * 
 * - matchScore : number
 * 
 * ai output data :
 * - technical questions :[[
    *   {
    *     question: String, (what the interviewer will ask you)
    *     intention: String, (what is the actual intention of the interviewer for ask this question)
    *     answer: String (what you will answer)
 *   }
 * ]]
 * 
 * 
 * - behavioral questions :[{
    *   question: String, (what the interviewer will ask you)
    *   intention: String, (what is the actual intention of the interviewer for ask this question)
    *   answer: String (what you will answer)
 * }]
 * 
 * 
 * - skill gaps :[{
    *   skill: String, (what is the skill that you are lacking)
    *   severity: String, (how severe is the skill gap){
    *     low: String,
    *     medium: String,
    *     high: String,
    *   }
    *   solution: String, (what is the solution to this skill gap)
 * }]
 * 
 * 
 * - preparation plan : {[
 *   {
 *     day : number,
    * focus : String, (what is the focus of the day)
    * tasks : [String], (what are the tasks that you need fto complete)
 *   }
 * ]}
 * 
 */


const technicalQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true , "Technical question is required"],
    },
    intention: {
        type: String,
        required: [true , "Intention is required"],
    },
    answer: {
        type: String,
        required: [true , "Answer is required"],
    },
}, {
    _id: false,
});



const behavioralQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true , "Behavioral question is required"],
    },
    intention: {
        type: String,
        required: [true , "Intention is required"],
    },
    answer: {
        type: String,
        required: [true , "Answer is required"],
    },
}, {
    _id: false,
});



const skillGapSchema = new mongoose.Schema({
    skill: {
        type: String,
        required: [true , "Skill is required"],
    },
    severity: {
        type: String,
        enum: ["low", "medium", "high"],
        required: [true , "Severity is required"],
    },
}, {
    _id: false,
});



const preparationPlanSchema = new mongoose.Schema({
    day: {
        type: Number,
        required: [true , "Day is required"],
    },
    focus: {
        type: String,
        required: [true , "Focus is required"],
    },
    tasks: {
        type: [String],
        required: [true , "Tasks are required"],
    },
}, {
    _id: false,
});


const interviewReportSchema = new mongoose.Schema({
    jobDescription: {
        type: String,
        required: true,
    },
    resume: {
        type: String,
    },
    selfDescription: {
        type: String,
    },
    matchScore: {
        type: Number,
        min: 0,
        max: 100,
    },
    technicalQuestions: [technicalQuestionSchema],
    behavioralQuestions: [behavioralQuestionSchema],
    skillGaps: [skillGapSchema],
    preparationPlan: [preparationPlanSchema],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    title: {
        type: String,
        required: [true , "Job title is required"],
    },
} , {
    timestamps: true,
});


const interviewReportModel = mongoose.model("InterviewReport", interviewReportSchema);
module.exports = interviewReportModel;