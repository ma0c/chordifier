export class MIDIManager {
    constructor(selectId){
        this.selectId = selectId;
        this.midiSelect = document.getElementById(this.selectId);
        this.midiSelect.onchange = this.MIDISelectChange;
        this.selectedMIDI = null;
        this.midiInstance = null;
    }

    MIDISelectChange = () => {
        const selectedMIDIId = this.midiSelect.options[this.midiSelect.selectedIndex].value;
        this.selectedMIDI = this.midiInstance.inputs.get(selectedMIDIId);
        this.selectedMIDI.onmidimessage = this.handleMIDIMessage;
    };

    handleMIDIMessage = (midi_message) => {
        console.log(midi_message);
    };

    populateMIDIInputs = () => {
      console.log();
      // TODO: this is too ugly but works
      this.midiSelect.length = 0;
      this.midiInstance.inputs.forEach((input) => {
         console.log(input);
         this.midiSelect.appendChild(new Option(input.name, input.id))
      });

    };

    requestMIDIAccess = () => {
        navigator.requestMIDIAccess()
        .then((midiInstance) => {
            this.midiInstance = midiInstance;
            this.populateMIDIInputs();
            this.midiInstance.onstatechange = () => {
                this.populateMIDIInputs();
            }
        });

    };

}


