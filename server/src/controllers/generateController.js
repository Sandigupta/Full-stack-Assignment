import { Language, Generation } from '../models/index.js';
import { generateCode } from '../services/aiService.js';

export const createGeneration = async (req, res) => {
    const { prompt, language } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
    }

    if (!language) {
        return res.status(400).json({ error: 'Language is required' });
    }

    try {
        // Validate language
        const langRecord = await Language.findOne({ where: { key: language } });
        if (!langRecord) {
            return res.status(400).json({ error: 'Invalid language' });
        }

        // Generate code
        const generatedCode = await generateCode(prompt, langRecord.name);

        // Save to DB
        const generation = await Generation.create({
            prompt,
            code: generatedCode,
            languageId: langRecord.id
        });

        res.json({
            id: generation.id,
            prompt: generation.prompt,
            code: generation.code,
            language: langRecord.key,
            createdAt: generation.createdAt
        });

    } catch (error) {
        console.error('Generation Error:', error);
        res.status(500).json({ error: 'Failed to generate code' });
    }
};
