(function () {
  const addAudioReviews = async () => {
    const placeId = window.location.href
      .match(/place\/.*?\/data/)[0]
      .split("/")[1];
    const response = await fetch(`back end adress${placeId}`);
    const audioReviews = await response.json();

    const container = document.createElement("div");
    container.id = "audio-reviews-container";
    container.style =
      "position: fixed; bottom: 10px; right: 10px; background: white; padding: 10px; border-radius: 5px;";

    container.innerHTML = `<h3>Avis audio</h3>`;
    audioReviews.forEach((review) => {
      const audio = document.createElement("audio");
      audio.controls = true;
      audio.src = review.audioUrl;
      container.appendChild(audio);
    });

    document.body.appendChild(container);
  };

  addAudioReviews();
})();
