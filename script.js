let vol;
navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true
    })
    .then(function(stream) {
        const audioContext = new AudioContext();
        const analyser = audioContext.createAnalyser();
        const microphone = audioContext.createMediaStreamSource(stream);
        const scriptProcessor = audioContext.createScriptProcessor(2048, 1, 1);

        analyser.smoothingTimeConstant = 0.8;
        analyser.fftSize = 1024;

        microphone.connect(analyser);
        analyser.connect(scriptProcessor);
        scriptProcessor.connect(audioContext.destination);
        scriptProcessor.onaudioprocess = function() {
        const array = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(array);
        const arraySum = array.reduce((a, value) => a + value, 0);
        const average = arraySum / array.length;
        vol = Math.round(average);
        // colorPids(average);
        };
    })
    .catch(function(err) {
        /* handle the error */
        console.error(err);
    });    

function setup() {
    createCanvas(300, 300);
    background(0);
}

function draw() {
    background(0);
    ellipse(150, 150, vol*5, vol*20);
}

//hello hhhhh