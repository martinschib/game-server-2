import express from 'express';
import { wordnettRouter } from './wordnett';

export const apiRouter = express.Router();

apiRouter.use('/api/wordnetts', wordnettRouter);
