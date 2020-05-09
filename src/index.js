import { drawScore } from './score';
import { MIDIManager } from './midi_permission';

const midiManager = new MIDIManager('midiInSelector');
midiManager.requestMIDIAccess();
drawScore('sheet');
