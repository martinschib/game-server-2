import express from 'express';
import { authenticationMiddleware } from '../middleware/authentication';
import { createWordnett, findWordnett, WordnettType } from '../persistence/wordnetts';
import { getMaxPoints } from '../utils/word';

type WordnettPostType = {
  wordnett: string;
  solutions: string[];
};

export const wordnettRouter = express.Router();

wordnettRouter.post('/', authenticationMiddleware, async (request, response) => {
  try {
    const { wordnett, solutions }: WordnettPostType = request.body;

    if (!wordnett || !solutions) {
      return response.status(400).json({
        message: 'wordnett and solutions must be provided',
      });
    }

    const wordnettId = await createWordnett(
      wordnett,
      getMaxPoints(solutions),
      solutions,
    );

    return response.status(200).json(wordnettId);
  } catch (error) {
    console.error(`something went wrong ${error}`);
    response.status(500).json();
  }
});

wordnettRouter.get('/:id', async (request, response) => {
  try {
    const id: string = request.params.id;
    if (!id || isNaN(Number(id))) {
      return response
        .status(400)
        .json({ message: 'A valid id must be provided' });
    }

    const wordnett = await findWordnett(parseInt(id) || 1);
    if (!wordnett) {
      return response
        .status(400)
        .json({ message: 'We could not find your wordnett' });
    }

    return response.status(200).json({
      id: wordnett.id,
      wordnett: wordnett.wordnett,
      solutions: wordnett.solutions,
      maxScore: wordnett.max_points,
      maxWords: wordnett.solutions.length,
    } as Omit<WordnettType, 'createdAt'>);
  } catch (error) {
    console.error(`something went wrong ${error}`);
    response.status(500).json();
  }
});

