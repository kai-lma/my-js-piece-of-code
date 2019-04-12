const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const average = nums => nums.reduce((acc, val) => acc + val, 0) / nums.length;

const averageSeeder = ({ min = 1, max = 5, average = 1.0, length = 1 }) => {
  // Initiate array of min
  const array = Array.from({ length }, () => min);

  // Seeding
  let remain = (parseFloat(average) - min) * length;
  let cursor = 0;
  while (remain > 0) {
    const randomIncrement = random(0, max - array[cursor]);
    array[cursor] += randomIncrement;
    remain -= randomIncrement;
    cursor = cursor === length - 1 ? 0 : cursor + 1;
  }

  // Shuffle
  for (let i = length - 1; i > 0; i -= 1) {
    const randomIndex = random(0, i);
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }

  return array;
};

const arr = averageSeeder({ min: 0, max: 100, average: 55, length: 100 });

console.log(arr);
console.log(average(arr));
