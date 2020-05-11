const PREFERRED_MIDI_DEVICE_KEY = "preferred_midi_device";

export class MIDIManager {
    constructor(selectId){
        this.selectId = selectId;
        this.midiSelect = document.getElementById(this.selectId);
        this.midiSelect.onchange = this.MIDISelectChange;
        this.selectedMIDI = null;
        this.midiInstance = null;
        this.activeNotes = {};
        this.pedal_on = false;
        this.notifyNotesChanged = (notes) => {};
    }

    MIDISelectChange = () => {
        const selectedMIDIId = this.midiSelect.options[this.midiSelect.selectedIndex].value;
        this.selectedMIDI = this.midiInstance.inputs.get(selectedMIDIId);
        this.selectedMIDI.onmidimessage = this.handleMIDIMessage;
        localStorage.setItem(PREFERRED_MIDI_DEVICE_KEY, selectedMIDIId);
    };

    handleMIDIMessage = (midi_message) => {
        const [command, key, velocity] = midi_message.data;
        // console.log(command, key, velocity);
        switch (command) {
            case 144: // Key pressed
                this.activeNotes[key] = true;
                break;
            case 128: // Key released
                if (!this.pedal_on) {
                    delete this.activeNotes[key];
                } else {
                    this.activeNotes[key] = false;
                }
                break;
            case 176: // Pedal
                this.pedal_on = velocity === 127;
                if (! this.pedal_on) {
                    const notesToRemove = [];
                    Object.entries(this.activeNotes).forEach((note) => {
                        const noteKey = note[0], isActive = note[1];
                        if (!isActive) {
                           delete this.activeNotes[noteKey];
                        }
                    });
                }
                break;

        }
        this.notifyNotesChanged(this.activeNotes);
    };

    populateMIDIInputs = () => {
      // TODO: this is too ugly but works
      this.midiSelect.length = 0;
      const preferred_midi_device = localStorage.getItem(PREFERRED_MIDI_DEVICE_KEY);
      this.midiInstance.inputs.forEach((input) => {
         this.midiSelect.appendChild(
             new Option(
                 input.name,
                 input.id,
                 preferred_midi_device === input.id,
                 preferred_midi_device === input.id
             ),
         )
      });
        this.MIDISelectChange();
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


