const audioCtx = new AudioContext();
let source;
let stream;

const analyser = audioCtx.createAnalyser();
analyser.minDecibels = -90;
analyser.maxDecibels = -10;
analyser.smoothingTimeConstant = 0.85;

const distortion = audioCtx.createWaveShaper();
const gainNode = audioCtx.createGain();
const biquadFilter = audioCtx.createBiquadFilter();
const convolver = audioCtx.createConvolver();

const echoDelay = createEchoDelayEffect(audioCtx);

function makeDistortionCurve(amount: number) {
  const n_samples = 44100;
  const curve = new Float32Array(n_samples);
  const deg = Math.PI / 180;
  const k = typeof amount === "number" ? amount : 50;

  let i = 0,
    x;
  for (; i < n_samples; ++i) {
    x = (i * 2) / n_samples - 1;
    curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
  }
  return curve;
}

const canvas = document.createElement("canvas");

if (!canvas) throw null;

const canvasCtx = canvas.getContext("2d");

if (!canvasCtx) throw null;

let drawVisual = 0;

const constraints = { audio: true };
navigator.mediaDevices
  .getUserMedia(constraints)
  .then(function (stream) {
    source = audioCtx.createMediaStreamSource(stream);
    source.connect(distortion);
    distortion.connect(biquadFilter);
    biquadFilter.connect(gainNode);
    convolver.connect(gainNode);
    echoDelay.placeBetween(gainNode, analyser);
    analyser.connect(audioCtx.destination);

    visualize();
    voiceChange();
  });

const drawSinewave = (WIDTH: number, HEIGHT: number) => {
  analyser.fftSize = 2048;
  const bufferLength = analyser.fftSize;

  const dataArray = new Uint8Array(bufferLength);

  canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

  const draw = function () {
    drawVisual = requestAnimationFrame(draw);

    analyser.getByteTimeDomainData(dataArray);

    canvasCtx.fillStyle = "rgb(200, 200, 200)";
    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

    canvasCtx.lineWidth = 2;
    canvasCtx.strokeStyle = "rgb(0, 0, 0)";

    canvasCtx.beginPath();

    const sliceWidth = (WIDTH * 1.0) / bufferLength;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      const v = dataArray[i] / 128.0;
      const y = (v * HEIGHT) / 2;

      if (i === 0) {
        canvasCtx.moveTo(x, y);
      } else {
        canvasCtx.lineTo(x, y);
      }

      x += sliceWidth;
    }

    canvasCtx.lineTo(canvas.width, canvas.height / 2);
    canvasCtx.stroke();
  };

  draw();
};

const drawFrequencybars = (WIDTH: number, HEIGHT: number) => {
  analyser.fftSize = 256;
  const bufferLengthAlt = analyser.frequencyBinCount;
  const dataArrayAlt = new Uint8Array(bufferLengthAlt);

  canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

  const drawAlt = function () {
    drawVisual = requestAnimationFrame(drawAlt);

    analyser.getByteFrequencyData(dataArrayAlt);

    canvasCtx.fillStyle = "rgb(0, 0, 0)";
    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

    const barWidth = (WIDTH / bufferLengthAlt) * 2.5;
    let barHeight;
    let x = 0;

    for (let i = 0; i < bufferLengthAlt; i++) {
      barHeight = dataArrayAlt[i];

      canvasCtx.fillStyle = "rgb(" + (barHeight + 100) + ",50,50)";
      canvasCtx.fillRect(
        x,
        HEIGHT - barHeight / 2,
        barWidth,
        barHeight / 2,
      );

      x += barWidth + 1;
    }
  };

  drawAlt();
};

const clear = (WIDTH: number, HEIGHT: number) => {
  canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
  canvasCtx.fillStyle = "red";
  canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
};

function visualize() {
  if (!canvasCtx) return;

  const WIDTH = canvas.width;
  const HEIGHT = canvas.height;
  const visualSetting: string = "";

  if (visualSetting === "sinewave") {
    drawSinewave(WIDTH, HEIGHT);
  } else if (visualSetting == "frequencybars") drawFrequencybars(WIDTH, HEIGHT);
  else if (visualSetting == "off") {
    clear(WIDTH, HEIGHT);
  }
}

function voiceChange() {
  distortion.oversample = "4x";
  biquadFilter.gain.setTargetAtTime(0, audioCtx.currentTime, 0);

  const voiceSetting: string = "";

  if (echoDelay.isApplied()) {
    echoDelay.discard();
  }

  // When convolver is selected it is connected back into the audio path
  if (voiceSetting == "convolver") {
    biquadFilter.disconnect(0);
    biquadFilter.connect(convolver);
  } else {
    biquadFilter.disconnect(0);
    biquadFilter.connect(gainNode);

    if (voiceSetting == "distortion") {
      distortion.curve = makeDistortionCurve(400);
    } else if (voiceSetting == "biquad") {
      biquadFilter.type = "lowshelf";
      biquadFilter.frequency.setTargetAtTime(1000, audioCtx.currentTime, 0);
      biquadFilter.gain.setTargetAtTime(25, audioCtx.currentTime, 0);
    } else if (voiceSetting == "delay") {
      echoDelay.apply();
    } else if (voiceSetting == "off") {
      console.log("Voice settings turned off");
    }
  }
}

function createEchoDelayEffect(audioContext: AudioContext) {
  const delay = audioContext.createDelay(1);
  const dryNode = audioContext.createGain();
  const wetNode = audioContext.createGain();
  const mixer = audioContext.createGain();
  const filter = audioContext.createBiquadFilter();

  delay.delayTime.value = 0.75;
  dryNode.gain.value = 1;
  wetNode.gain.value = 0;
  filter.frequency.value = 1100;
  filter.type = "highpass";

  return {
    apply: function () {
      wetNode.gain.setValueAtTime(0.75, audioContext.currentTime);
    },
    discard: function () {
      wetNode.gain.setValueAtTime(0, audioContext.currentTime);
    },
    isApplied: function () {
      return wetNode.gain.value > 0;
    },
    placeBetween: function (inputNode: AudioNode, outputNode: AudioNode) {
      inputNode.connect(delay);
      delay.connect(wetNode);
      wetNode.connect(filter);
      filter.connect(delay);

      inputNode.connect(dryNode);
      dryNode.connect(mixer);
      wetNode.connect(mixer);
      mixer.connect(outputNode);
    },
  };
}
