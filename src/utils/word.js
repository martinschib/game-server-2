function calculateWordPoints(word) {
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

function getMaxPoints(words) {
  let points = 0;
  words.forEach((element) => {
    points += calculateWordPoints(element);
  });
  return points;
}

module.exports = { calculateWordPoints, getMaxPoints };
