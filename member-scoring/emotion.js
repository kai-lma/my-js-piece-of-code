/* Constants */
const FORM_ID = '#qform';
const INPUT_QUERY_SELECTOR = '.question-radiobox input';
const NUMBER_OF_RADIO_BUTTON_PER_QUESTION = 5;
const HATE_RANGE = [0, 2];
const LIKE_RANGE = [3, 4];

/* Utility functions */
const chunk = (arr, size) => Array.from({ length: Math.ceil(arr.length / size) }, (v, i) => arr.slice(i * size, i * size + size));
const randomInRange = ([min, max]) => Math.floor(Math.random() * (max - min + 1)) + min;
const makeScoreRangeWithEmotion = likeThisPersion => likeThisPersion ? LIKE_RANGE : HATE_RANGE;

/* DOMs side effect functions */
const resetForm = () => $(FORM_ID)[0].reset();

const getQuestions = () => {
  const radioButtons = $(INPUT_QUERY_SELECTOR);
  return chunk(radioButtons, NUMBER_OF_RADIO_BUTTON_PER_QUESTION);
}

const scoring = (likeThisPersion) => {
  const questions = getQuestions();
  const range = makeScoreRangeWithEmotion(likeThisPersion);
  questions.forEach(question => $(question[randomInRange(range)]).prop('checked', true));
};

const evaluateMember = (likeThisPersion) => {
  resetForm();
  scoring(likeThisPersion);
};

/* Main */
const main = (() => {
  evaluateMember(confirm('Do you like this person?'));
})();
