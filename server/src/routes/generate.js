import express from 'express';
import { createGeneration } from '../controllers/generateController.js';

const router = express.Router();

router.post('/', createGeneration);

export default router;
