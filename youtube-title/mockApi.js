const mockApi = youtubeId =>
  new Promise(resolve => {
    console.log('New Promise Created');
    const random = Math.floor(Math.random() * 5 + 1);
    const correctData = { items: [{ snippet: { title: `title: ${youtubeId}` } }] };
    const emptyData = { items: [] };
    const res = random % 5 !== 0 ? correctData : emptyData;
    setTimeout(() => resolve(res), random * 1000);
  });
