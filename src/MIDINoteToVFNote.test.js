import { MIDINoteToNoteVFNoteName } from './MIDINoteTransform';

test('Check note numbers', ()=> {
    expect(MIDINoteToNoteVFNoteName(21)).toBe("a/0");
    expect(MIDINoteToNoteVFNoteName(60)).toBe("c/4");
});
