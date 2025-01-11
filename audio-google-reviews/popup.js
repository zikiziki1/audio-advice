const recordButton = document.getElementById("start-record");
const stopButton = document.getElementById("stop-record");
const uploadButton = document.getElementById("upload-audio");
const playback = document.getElementById("audio-playback");

let mediaRecorder;
let audioChunks = [];

recordButton.addEventListener("click", async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  mediaRecorder = new MediaRecorder(stream);
  audioChunks = [];

  mediaRecorder.ondataavailable = (event) => audioChunks.push(event.data);
  mediaRecorder.onstop = () => {
    const audioBlob = new Blob(audioChunks, { type: "audio/mp3" });
    playback.src = URL.createObjectURL(audioBlob);
    uploadButton.disabled = false;
  };

  mediaRecorder.start();
  recordButton.disabled = true;
  stopButton.disabled = false;
});

stopButton.addEventListener("click", () => {
  mediaRecorder.stop();
  recordButton.disabled = false;
  stopButton.disabled = true;
});

uploadButton.addEventListener("click", async () => {
  const audioBlob = new Blob(audioChunks, { type: "audio/mp3" });
  const formData = new FormData();
  formData.append("audio", audioBlob, "review.mp3");

  const response = await fetch("adresse du back end", {
    method: "POST",
    body: formData,
  });

  if (response.ok) {
    alert("Avis audio enregistré avec succès !");
  } else {
    alert("Erreur lors de l'enregistrement de l'avis.");
  }
});
