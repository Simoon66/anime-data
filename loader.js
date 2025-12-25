(async function() {
  const app = document.getElementById('anime-app');
  const id = app.dataset.id;
  const jsonUrl = `https://cdn.jsdelivr.net/gh/USERNAME/anime-data/${id}.json`;

  // JSON পড়া
  const res = await fetch(jsonUrl);
  const data = await res.json();

  // API থেকে extra info আনবে
  const apiRes = await fetch(`https://api.jikan.moe/v4/anime?q=${id}`);
  const apiData = await apiRes.json();
  const anime = apiData.data[0];

  // Page inject
  app.innerHTML = `
    <h1>${anime.title}</h1>
    <img src="${data.poster}" style="max-width:300px;">
    <p><strong>Japanese:</strong> ${anime.title_japanese}</p>
    <p><strong>Synopsis:</strong> ${anime.synopsis}</p>
    <p><strong>MAL Score:</strong> ${anime.score}</p>
    <p><strong>Episodes:</strong> ${anime.episodes}</p>
    <div id="episodes">
      ${data.episodes.map(ep=>`
        <h3>Episode ${ep.ep}: ${ep.title}</h3>
        ${ep.files.map(f=>`<a href="${f.url}" target="_blank">${f.label}</a>`).join(' ')}
      `).join('')}
    </div>
  `;
})();
