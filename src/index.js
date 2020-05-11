import { ScoreController } from './score';
import { MIDIManager } from './MIDIManager';
import {MIDINoteToNoteName, MIDINoteToNoteVFNoteName} from './MIDINoteTransform';
import { ChordManager } from './chords';
import { KeyboardController } from './keyboard';

const midiManager = new MIDIManager('midiInSelector');
midiManager.requestMIDIAccess();
const scoreController = new ScoreController('sheet');

scoreController.drawScore();

const chordManager = new ChordManager('chord');

const keyboardManager = new KeyboardController('keyboard');
keyboardManager.plotPiano();

midiManager.notifyNotesChanged = (notes) => {
    scoreController.drawNotes(
        Object.keys(notes).map(MIDINoteToNoteVFNoteName)
    );
    chordManager.identify(
        Object.keys(notes).map(MIDINoteToNoteName)
    );
    keyboardManager.pushKeys(Object.keys(notes));
};



