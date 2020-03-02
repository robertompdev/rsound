
let audioCtx = new window.AudioContext()
let osc = audioCtx.createOscillator()
let gain = audioCtx.createGain()
let wave = audioCtx.createPeriodicWave(wavetable.real, wavetable.imag)

export const startOsc = (freq) => {


    let osc = audioCtx.createOscillator();
    osc.setPeriodicWave(wave);
    osc.frequency.value = freq;
    osc.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 1);



    //////////////////////////////////////////////////////////
    // Frequency is passed to this function from input button 

    // Create OscillatorNode
    //osc = audioCtx.createOscillator(); // Create sound source
    // osc.type = 'sine' // Sine wave
    // osc.frequency.value = freq; // Frequency in hertz (passed from input button)
    // osc.start(0); // Play oscillator instantly

    // Create GainNode	
    // gain = audioCtx.createGain(); // Create gain node
    // gain.gain.value = 1; // Set gain to full volume

    // // Connect the Nodes
    // osc.connect(gain); // Connect oscillator to gain
    // gain.connect(audioCtx.destination); // Connect gain to output

}

export const stopOsc = () => {
    osc.stop(0) // Stop oscillator after 0 seconds
    osc.disconnect() // Disconnect oscillator so it can be picked up by browser’s garbage collector
}