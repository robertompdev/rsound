
let audioCtx = new window.AudioContext()

let lfo = audioCtx.createOscillator()
let vca = audioCtx.createGain()
let osc = audioCtx.createOscillator()
let gain = audioCtx.createGain()

export const startOsc = (freq) => {
    gain.gain.value = 1
    osc.detune.value = 0
    lfo.connect(vca.gain)
    osc.connect(vca)
    vca.connect(audioCtx.destination)

    lfo.frequency.value = 4

    // lfo.start(0)

    osc = audioCtx.createOscillator() // Create sound source
    osc.type = 0 // Sine wave
    osc.frequency.value = 230 // Frequency in hertz (passed from input button)
    osc.start(0) // Play oscillator instantly

    // Create GainNode	
    gain = audioCtx.createGain() // Create gain node
    gain.gain.value = 1 // Set gain to full volume

    // Connect the Nodes
    osc.connect(gain) // Connect oscillator to gain
    gain.connect(audioCtx.destination) // Connect gain to output
}

export const stopOsc = () => {
    osc.stop(0) // Stop oscillator after 0 seconds
    osc.disconnect() // Disconnect oscillator so it can be picked up by browser’s garbage collector
}