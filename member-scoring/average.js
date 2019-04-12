/* Constants */
const FORM_ID = '#qform';
const INPUT_QUERY_SELECTOR = '.question-radiobox input';
const NUMBER_OF_RADIO_BUTTON_PER_QUESTION = 5;

/* Utility functions */
const chunk = (arr, size) => Array.from({ length: Math.ceil(arr.length / size) }, (v, i) => arr.slice(i * size, i * size + size));
const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const calcRangeIndex = string => (string.match(/^[1-5]$/) ? parseInt(string) - 1 : 0);
const calcAverageIndex = string => parseFloat(string) - 1;
const validateInput = (min, max, average) => average >= min && average <= max;

const averageSeeder = ({ min = 1, max = 5, average = 1.0, length = 1 }) => {
  // Initiate array of min values
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

  // Return a generator
  return (function*() {
    let i = 0;
    while (i < length) {
      yield array[i];
      i++;
    }
  })();
};

/* DOMs side effect functions */
const resetForm = () => $(FORM_ID)[0].reset();
const getQuestions = () => chunk($(INPUT_QUERY_SELECTOR), NUMBER_OF_RADIO_BUTTON_PER_QUESTION);

const scoring = () => {
  resetForm();
  const min = calcRangeIndex(prompt('Min Score = ', '4'));
  const max = calcRangeIndex(prompt('Max Score = ', '5'));
  const average = calcAverageIndex(prompt('Average Score = ', '4.5'));

  if (!validateInput(min, max, average)) return console.log('Are you kidding me?');

  const questions = getQuestions();
  const seeder = averageSeeder({ min, max, average, length: questions.length });
  questions.forEach(question => $(question[seeder.next().value]).prop('checked', true));
};

/* Main */
const main = (() => {
  scoring();
})();
