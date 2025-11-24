import { GoogleGenerativeAI } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const genAI = new GoogleGenerativeAI("AIzaSyAng1tTIo-kpmTKpPmQMVfWnRYZeIaVWRw");
export const generateCode = async (prompt, language) => {
    try {
        const enhancedPrompt = `
Write ${language} code for the following task:
${prompt}

Provide ONLY raw code (no markdown backticks, no extra text).
If comments are needed, include them inside the code.
`;

        // Use the model
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        // Send prompt to Gemini API
        const response = await model.generateContent(enhancedPrompt);

        // Extract text output
        let code = response.response.text();

        // Clean backticks if any appear
        code = code.replace(/```[\s\S]*?```/g, "").trim();

        return code;
    } catch (error) {
        console.error("Gemini API Error:", error);
        throw new Error("Failed to generate code");
    }
};











// import { GoogleGenAI } from "@google/genai";

// const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// export const generateCode = async (prompt, language) => {
//     try {
//         const enhancedPrompt = `Write ${language} code for the following task: ${prompt}.
//     Provide ONLY the code, no markdown formatting, no explanations.
//     If comments are needed, include them in the code.`;

//         // Using gemini-1.5-flash as a safe default, can be changed to gemini-pro or others
//         const response = await ai.models.generateContent({
//             model: "gemini-1.5-flash",
//             contents: enhancedPrompt,
//         });

//         let code = response.text();

//         // Clean up markdown code blocks if present
//         if (code) {
//             code = code.replace(/^```[a-z]*\n/i, '').replace(/\n```$/, '');
//         }

//         return code;

//     } catch (error) {
//         console.error('Gemini API Error Details:', error.message);
//         console.error('Full Error:', error);
//         throw new Error('Failed to generate code');
//     }
// };
