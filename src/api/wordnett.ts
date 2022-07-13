import express from "express";
import { authenticationMiddleware } from "../middleware/authentication";
import Wordnett, { WordnettType } from "../persistence/wordnetts";
import { getMaxPoints } from "../utils/word";

const router = express.Router();

router.post("/", authenticationMiddleware, async (request, response) => {
  try {
    const { wordnett, solutions }: { wordnett: string; solutions: string[] } =
      request.body;

    if (!wordnett || !solutions) {
      return response.status(400).json({
        message: "wordnett and solutions must be provided",
      });
    }

    const wordnettId = await Wordnett.create(
      wordnett,
      getMaxPoints(solutions),
      solutions
    );

    return response.status(200).json(wordnettId);
  } catch (error) {
    console.error(`something went wrong ${error}`);
    response.status(500).json();
  }
});

router.get("/", async (request, response) => {
  try {
    const { id } = request.body;
    if (!id || typeof id != "number") {
      return response
        .status(400)
        .json({ message: "A valid id must be provided" });
    }

    const wordnett = await Wordnett.find(id);
    if (!wordnett) {
      return response
        .status(400)
        .json({ message: "We could not find your wordnett" });
    }

    return response.status(200).json({
      id: wordnett.id,
      wordnett: wordnett.wordnett,
      solutions: wordnett.solutions,
      maxPoints: wordnett.max_points,
      maxWords: wordnett.solutions.length,
    } as Omit<WordnettType, "createdAt">);
  } catch (error) {
    console.error(`something went wrong ${error}`);
    response.status(500).json();
  }
});

export default router;
