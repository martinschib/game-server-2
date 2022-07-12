const { Router } = require("express");
const authenticationMiddleware = require("../middleware/authentication");
const Wordnetts = require("../persistence/wordnetts");
const { getMaxPoints } = require("../utils/word");

const router = new Router();

router.post("/", authenticationMiddleware, async (request, response) => {
  try {
    const { wordnett, solutions } = request.body;
    if (!wordnett || !solutions) {
      return response.status(400).json({
        message: "wordnett and solutions must be provided",
      });
    }

    const wordnett_id = await Wordnetts.create(
      wordnett,
      getMaxPoints(solutions),
      solutions
    );

    return response.status(200).json(wordnett_id);
  } catch (error) {
    console.error(`somthing went wrong ${error}`);
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

    const wordnett = await Wordnetts.find(id);
    if (!wordnett) {
      return response
        .status(400)
        .json({ message: "We could not find your wordnett" });
    }

    return response.status(200).json({
      wordnett: wordnett.wordnett,
      solutions: wordnett.solutions,
      max_points: wordnett.max_points,
      max_words: wordnett.solutions.length,
    });
  } catch (error) {
    console.error(`somthing went wrong ${error}`);
    response.status(500).json();
  }
});

module.exports = router;
