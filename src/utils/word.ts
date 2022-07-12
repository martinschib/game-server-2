export function calculateWordPoints(word: string) {
  switch (word.length) {
    case 4:
      return 6;
    case 5:
      return 7;
    case 6:
      return 10;
    case 7:
      return 15;
    case 8:
      return 22;
    case 9:
      return 30;
  }
  return 0;
}

export function getMaxPoints(words: string[]) {
  let totalPoints = 0;
  for (const word of words) {
    totalPoints += calculateWordPoints(word);
  }
  return totalPoints;
}
