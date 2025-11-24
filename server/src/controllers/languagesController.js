import { Language } from '../models/index.js';

export const getLanguages = async (req, res) => {
    try {
        const languages = await Language.findAll({
            attributes: ['id', 'key', 'name']
        });
        res.json(languages);
    } catch (error) {
        console.error('Error fetching languages:', error);
        res.status(500).json({ error: 'Failed to fetch languages' });
    }
};
