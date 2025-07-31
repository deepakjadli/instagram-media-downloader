document.getElementById('downloadBtn').addEventListener('click', async () => {
  const instaUrl = document.getElementById('instagramInput').value.trim();
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = 'Processing...';

  if (!instaUrl) {
    resultDiv.innerHTML = 'Please enter an Instagram post/reel/story link.';
    return;
  }

  const apiUrl = `https://instagram-downloader-scraper-reels-igtv-posts-stories.p.rapidapi.com/scraper?url=${encodeURIComponent(instaUrl)}`;
  const apiKey = '323300665fmsh7b8ae35163363c3p1b9ea9jsncb89792481f1';
  const apiHost = 'instagram-downloader-scraper-reels-igtv-posts-stories.p.rapidapi.com';

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': apiHost
      }
    });

    const result = await response.json();
    console.log(result);

    if (result && result.data && result.data.length > 0 && result.data[0].media) {
      resultDiv.innerHTML = `
        <img src="${result.data[0].thumb}" alt="Thumbnail" style="max-width:200px;display:block;margin-bottom:10px;">
        <button id="downl">
          <a style="color:rgb(173, 29, 199);" href="${result.data[0].media}" target="_blank" download>
            Download Media
          </a>
        </button>
      `;
    } else if (result && result.message) {
      resultDiv.innerHTML = `Error: ${result.message}`;
    } else {
      resultDiv.innerHTML = 'Could not fetch download link. API response: ' + JSON.stringify(result);
    }
  } catch (error) {
    resultDiv.innerHTML = 'Error: ' + error.message;
  }
});
