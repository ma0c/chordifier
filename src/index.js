import { ScoreController } from './score';
import { MIDIManager } from './MIDIManager';
import {MIDINoteToNoteName, MIDINoteToNoteVFNoteName} from './MIDINoteTransform';
import { ChordManager } from './chords';

const midiManager = new MIDIManager('midiInSelector');
midiManager.requestMIDIAccess();
const scoreController = new ScoreController('sheet');

scoreController.drawScore();

const chordManager = new ChordManager('chord');

midiManager.notifyNotesChanged = (notes) => {
    scoreController.drawNotes(
        Object.keys(notes).map(MIDINoteToNoteVFNoteName)
    );
    chordManager.identify(
        Object.keys(notes).map(MIDINoteToNoteName)
    )
};


