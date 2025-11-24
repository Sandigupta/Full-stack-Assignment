import express from 'express';
import { getHistory, deleteGeneration } from '../controllers/historyController.js';

const router = express.Router();

router.get('/', getHistory);
router.delete('/:id', deleteGeneration);

export default router;
