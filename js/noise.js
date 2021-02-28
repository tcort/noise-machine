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
    filter.frequency.value = 256;
    filter.Q.value = 0.64;
    filter.type = 'lowpass';

    src.connect(filter);
    filter.connect(ctx.destination);

}

window.onload = init;
