var midi, data;
// request MIDI access
if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess({
        sysex: false
    }).then(onMIDISuccess, onMIDIFailure);
} else {
    alert("No MIDI support in your browser.");
}

// midi functions
function onMIDISuccess(midiAccess) {
  console.log("success")
    // when we get a succesful response, run this code
    midi = midiAccess; // this is our raw MIDI data, inputs, outputs, and sysex status

    var inputs = midi.inputs.values();
    // loop over all available inputs and listen for any MIDI input
    for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
        console.log("seting up midi callback")
        input.value.onmidimessage = onMIDIMessage;
    }
}

function onMIDIFailure(error) {
    // when we get a failed response, run this code
    console.log("No access to MIDI devices or your browser doesn't support WebMIDI API. Please use WebMIDIAPIShim " + error);
}

function onMIDIMessage(message) {
    data = message.data;
    changeLEDColorTo(colorConfig(data[1]))
}

function changeLEDColorTo(color) {
  console.log("changing color")
  var body = document.getElementsByTagName("body")[0];
  body.style.background = color;
}

function colorConfig(pad) {
  return {
    "1": "red",
    "2": "green",
    "3": "blue",
    "4": "yellow",
    "49": "hotpink",
    "50": "cyan",
    "51": "skyblue",
    "52": "purple"
  }[pad]
}
