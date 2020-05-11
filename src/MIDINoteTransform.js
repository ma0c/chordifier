export const NOTE_NAMES = [
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
};

export const NOTE_NAMES_STARTING_FROM = (startingFrom='C') => {
    if (!NOTE_NAMES.includes(startingFrom)) {
        throw Error(`Note ${startingFrom} is invalid`)
    }
    const noteIndex = NOTE_NAMES.indexOf(startingFrom);
    return NOTE_NAMES.slice(noteIndex, NOTE_NAMES.length).concat(NOTE_NAMES.slice(0, noteIndex));
}
