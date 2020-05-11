// Adapted from https://github.com/1000mileworld/Piano-Keyboard/blob/master/playKeyboard.js
import { NOTE_NAMES_STARTING_FROM } from './MIDINoteTransform';

export class KeyboardController {
    constructor(elementId, octaves=5, noteStart='C', startOctave=3) {
        this.visualKeyboard = document.getElementById(elementId);
        this.keysPressed = [];
        this.pressColor = '#1BC0EA'; //color when key is pressed

        window.addEventListener('keydown', this.fnPlayKeyboard);
	    window.addEventListener('keyup', this.fnRemoveKeyBinding);
	    this.octaves = octaves;
	    this.notes = NOTE_NAMES_STARTING_FROM(noteStart);
	    this.startNote = 12 * startOctave + NOTE_NAMES_STARTING_FROM("C").indexOf(noteStart);

    }


    plotPiano = () => {
        let iWhite = 0;
        let noteNumber = this.startNote;
        for(let octave=0; octave < this.octaves; octave++) {
            this.notes.forEach((note) => {

                let thisKey = document.createElement('div');
                if(note.length>1) { //adding sharp sign makes 2 characters
                    thisKey.className = 'black key'; //2 classes
                    thisKey.style.width = '30px';
                    thisKey.style.height = '120px';
                    thisKey.style.left = (40 * (iWhite - 1)) + 25 + 'px';
                } else {
                    thisKey.className = 'white key';
                    thisKey.style.width = '40px';
                    thisKey.style.height = '200px';
                    thisKey.style.left = 40 * iWhite + 'px';
                    iWhite++;
                }

                const label = document.createElement('div');
                label.className = 'label';

                thisKey.appendChild(label);
                thisKey.setAttribute('ID', 'KEY_' + note + ',' + octave);
                thisKey.setAttribute('noteNumber', noteNumber);
                this.visualKeyboard[noteNumber] = thisKey;
                this.visualKeyboard.appendChild(thisKey);
                noteNumber ++;
            });
        }

        this.visualKeyboard.style.width = iWhite * 40 + 'px';
	}

	pushKeys = (keys) => {

		keys.forEach((keyNumber) => {
		    if (!this.keysPressed.includes(keyNumber)) {
		        this.keysPressed.push(keyNumber)
            }
		    this.visualKeyboard[keyNumber].style.backgroundColor = this.pressColor;
            this.visualKeyboard[keyNumber].style.marginTop = '5px';
            this.visualKeyboard[keyNumber].style.boxShadow = 'none';
        });
		this.keysPressed.forEach((keyPressed) => {
		    if (!keys.includes(keyPressed)) {
		        this.visualKeyboard[keyPressed].style.backgroundColor = '';
                this.visualKeyboard[keyPressed].style.marginTop = '';
                this.visualKeyboard[keyPressed].style.boxShadow = '';
                delete this.keysPressed[this.keysPressed.indexOf(keyPressed)];
            }
        })

	}


}
