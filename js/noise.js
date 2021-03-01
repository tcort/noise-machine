function init() {

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContext();

    const buflen = 4 * ctx.sampleRate;
    const buffer = ctx.createBuffer(1, buflen, ctx.sampleRate);

    let channelData = buffer.getChannelData(0);
    for (let i = 0; i < buflen; i++) {
        channelData[i] = (Math.random() * 2) - 1;
    }

    // white noise
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    src.loop = true;
    src.start(0);

    // pseudo brown/pink noise filter
    const filter = ctx.createBiquadFilter();
    filter.frequency.value = 420;
    filter.Q.value = 0.69;
    filter.type = 'lowpass';

    const amp = ctx.createGain();
    amp.gain.value = 2;

    src.connect(filter);
    filter.connect(amp);
    amp.connect(ctx.destination);

}

window.onload = init;
