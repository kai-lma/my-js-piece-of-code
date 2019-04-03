/* Constants */
const FORM_ID = '#qform';
const INPUT_QUERY_SELECTOR = '.question-radiobox input';
const NUMBER_OF_RADIO_BUTTON_PER_QUESTION = 5;

/* Utility functions */
const chunk = (arr, size) => Array.from({ length: Math.ceil(arr.length / size) }, (v, i) => arr.slice(i * size, i * size + size));
const randomInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const calRangeIndex = string => (string.match(/^[1-5]$/) ? parseInt(string) - 1 : 0);

/* DOMs side effect functions */
const resetForm = () => $(FORM_ID)[0].reset();
const getQuestions = () => chunk($(INPUT_QUERY_SELECTOR), NUMBER_OF_RADIO_BUTTON_PER_QUESTION);

const scoring = () => {
  const min = calRangeIndex(prompt('Min Score = ', '4'));
  const max = calRangeIndex(prompt('Max Score = ', '5'));
  resetForm();
  getQuestions().forEach(question => $(question[randomInRange(min, max)]).prop('checked', true));
};

/* Main */

const main = (() => {
  scoring();
})();
