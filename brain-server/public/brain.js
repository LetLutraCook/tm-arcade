const URL = "https://teachablemachine.withgoogle.com/models/YOUR_MODEL/";

let model, webcam, ws;

async function init() {
  ws = new WebSocket("ws://localhost:8080");

  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";

  model = await tmImage.load(modelURL, metadataURL);

  webcam = new tmImage.Webcam(200, 200, true);
  await webcam.setup();
  await webcam.play();

  document.getElementById("video").replaceWith(webcam.canvas);

  loop();
}

async function loop() {
  webcam.update();

  const prediction = await model.predict(webcam.canvas);

  const best = prediction.reduce((a, b) =>
    a.probability > b.probability ? a : b
  );

  if (ws.readyState === 1) {
    ws.send(JSON.stringify({
      label: best.className,
      confidence: best.probability
    }));
  }

  requestAnimationFrame(loop);
}

init();