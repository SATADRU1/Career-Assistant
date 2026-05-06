const Groq = require("groq-sdk");
const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");

// Initialize Groq
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

// Your existing Zod Schema
const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0-100 indicating how well the candidate profile matches the job description. Be critical."),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("Highly specific technical question based on the Job Description and the candidate's Resume."),
        intention: z.string().describe("A deep explanation of what specific technical concept or problem-solving ability the interviewer is testing."),
        answer: z.string().describe("A comprehensive, 3-4 sentence 'Senior-level' answer that includes technical terminology and best practices."),
    })).describe("A list of 3-5 challenging technical questions tailored to the candidate."),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("A situational question designed to test soft skills or leadership."),
        intention: z.string().describe("The underlying trait being tested (e.g., Conflict Resolution, Adaptability)."),
        answer: z.string().describe("A detailed ideal response following the STAR method (Situation, Task, Action, Result)."),
    })).describe("A list of 3-5 behavioral questions tailored to the candidate."),
    skillGaps: z.array(z.object({
        skill: z.string().describe("A specific technical skill, tool, or concept mentioned in the JD but missing from the Resume."),
        severity: z.enum(["low","medium","high"]).describe("How critical this specific gap is for the success of this role."),
    })).describe("An accurate list of gaps found by cross-referencing the Resume against the Job Description."),
    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number of the preparation."),
        focus: z.string().describe("The primary technical focus area for this day (e.g., 'Advanced Database Optimization')."),
        tasks: z.array(z.string()).describe("A list of 3-4 highly detailed, multi-sentence tasks. Each task must explain exactly what to study, what practical project to build, and why it is important for the role."),
    })).describe("A 7-day intensive, personalized preparation roadmap."),
});

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
    
    // We get the schema but remove the top-level metadata to keep it simple for the AI
    const schema = zodToJsonSchema(interviewReportSchema);
    delete schema.$schema;
    const jsonSchemaString = JSON.stringify(schema, null, 2);

    const prompt = `
        You are a Career Assistant AI. Your ONLY job is to analyze the provided documents and return a JSON report.
        
        REQUIRED JSON KEYS:
        - matchScore (number)
        - technicalQuestions (array of objects with question, intention, answer)
        - behavioralQuestions (array of objects with question, intention, answer)
        - skillGaps (array of objects with skill, severity)
        - preparationPlan (array of objects with day, focus, tasks)

        DOCUMENTS:
        - Resume: ${resume}
        - Self Description: ${selfDescription}
        - Job Description: ${jobDescription}

         CRITICAL QUALITY RULES:
        1. Be extremely accurate and critical when identifying skill gaps. Compare the Job Description and Resume technology-by-technology.
        2. 'Intention' must explain the specific psychology or technical logic behind the question.
        3. 'Answer' must be a deep, multi-sentence expert explanation.
        4. 'Preparation Plan' must be a high-intensity curriculum. Each 'task' must be a full, descriptive paragraph that guides the user on how to master the topic. Short or one-word tasks are strictly forbidden.

        Your response must be ONLY a JSON object matching this schema. Do not add any extra keys:
        ${jsonSchemaString}
    `;
    
    try {
        const response = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile", 
            messages: [
                {
                    role: "system",
                    content: "You are an expert Career Coach and Senior Technical Interviewer. You must provide highly detailed, comprehensive, and professional answers for every field in the JSON schema. Ensure technical answers are thorough and behavioral answers follow the STAR method.",
                },
                {
                    role: "user",
                    content: prompt,
                }
            ],
            temperature: 0.7,
            response_format: { type: "json_object" }, 
        });
        
        // Extract the text and parse it
        
        return JSON.parse(response.choices[0].message.content);
 
    } catch (error) {
        console.error("Error generating interview report with Groq:", error);
        throw error;
    }
}

module.exports = generateInterviewReport;
