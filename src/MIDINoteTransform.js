const NOTE_NAMES = [
    'A',
    'A#',
    'B',
    'C',
    'C#',
    'D',
    'D#',
    'E',
    'F',
    'F#',
    'G',
    'G#'
];

export const MIDINoteToNoteVFNoteName = (midiNoteNumber) => {
    return `${NOTE_NAMES[(midiNoteNumber-21)%12].toLowerCase()}/${Math.floor((midiNoteNumber-12)/12)}`
};

export const MIDINoteToNoteName = (midiNoteNumber) => {
    return NOTE_NAMES[(midiNoteNumber-21)%12];
}
