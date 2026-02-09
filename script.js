const scoresForDay3 = [78, 85, 64, 90, 72, 45, 39];

const result = {
  passed: (arr) => arr.filter((s) => s >= 50),
  failed: (arr) => arr.filter((s) => s < 50),
};

const currentMark = "passed";

// if it was on a ui

// currentMark would collect data Form

//  from a dropdown option

const output = result[currentMark]
  ? result.passed(scoresForDay3)
  : result.failed(scoresForDay3);

console.log(output.length);
