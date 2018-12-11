const fs = require('fs');
const axios = require('axios');
const { from } = require('rxjs');
const { mergeMap, reduce, tap, filter } = require('rxjs/operators');

/**
 * Configs
 */
const INPUT_DIR = './ids.txt';
const OUTPUT_DIR = './output.csv';

const REQUEST_CONCURENCY = 5;

const YOUTUBE_API_KEY = '[YOUTUBE_API_KEY]';

/**
 * Utils
 */
const titleEndpointById = youtubeId =>
  `https://www.googleapis.com/youtube/v3/videos?id=${youtubeId}&key=${YOUTUBE_API_KEY}&fields=items(id,snippet(title))&part=snippet`;

const getTittle = youtubeId => {
  return axios.get(titleEndpointById(youtubeId)).then(res => {
    const { data = {} } = res;
    const { items = [] } = data;
    const [firstItem = {}] = items;
    const { snippet = {} } = firstItem;
    const { title = `https://www.youtube.com/watch?v=${youtubeId}` } = snippet;
    return { [youtubeId]: title };
  });
};

/**
 * Main
 */
(function main() {
  const inputData = fs.readFileSync(INPUT_DIR, 'utf8').split('\n');
  const stream = from(inputData)
    .pipe(
      filter(id => !!id),
      tap(id => console.log(`Fetching ${id}...`)),
      mergeMap(id => from(getTittle(id)), REQUEST_CONCURENCY),
      reduce((obj, value) => ({ ...obj, ...value }), {}),
    )
    .subscribe({
      next: dictionary => {
        const outputData = inputData.map(id => `${id}, ${dictionary[id] || 'SOMETHING WRONG'}`).join('\n');
        fs.writeFileSync(OUTPUT_DIR, outputData);
        console.log('DONE');
      },
      error: error => {
        console.log(error.message);
      },
    });
})();
