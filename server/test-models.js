import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listModels() {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Dummy model to get client
        // There isn't a direct listModels on the client in this SDK version easily accessible 
        // without using the model manager if exposed, but let's try a different approach 
        // or just try a simple generation with a known safe model like 'gemini-pro' to see the specific error details
        // actually, the error message suggested ListModels. 

        // Let's try to use the API directly via fetch to list models if the SDK doesn't make it obvious
        // or use the SDK's model manager if available.
        // Checking SDK docs mentally... SDK usually doesn't have listModels on the main class instance in older versions?
        // But let's try to just run a test with 'gemini-1.5-flash' again but logging EVERYTHING.

        console.log("Testing gemini-1.5-flash...");
        const modelFlash = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await modelFlash.generateContent("Hello");
        console.log("Success with gemini-1.5-flash");
        console.log(result.response.text());

    } catch (error) {
        console.error("Error with gemini-1.5-flash:", error.message);
    }

    try {
        console.log("\nTesting gemini-pro...");
        const modelPro = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await modelPro.generateContent("Hello");
        console.log("Success with gemini-pro");
        console.log(result.response.text());
    } catch (error) {
        console.error("Error with gemini-pro:", error.message);
    }
}

listModels();
