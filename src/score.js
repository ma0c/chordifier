import Vex from 'vexflow';

const VF = Vex.Flow;

export class ScoreController {
    constructor(elementId) {
        this.elementId = elementId;
        this.trebleNotes = [];
        this.bassNotes = [];
        // Create an SVG renderer and attach it to the DIV element named "vf".
        const div = document.getElementById(this.elementId);
        this.renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

        // Configure the rendering context.
        this.renderer.resize(300, 300);
        this.context = this.renderer.getContext();
        this.context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");

    }

    formatNotes = (notes) => {
        const trebleNotes = [];
        const bassNotes = [];
        notes.forEach(note => {
            const octave = note.split("/")[1];
            if (octave > 3) {
                trebleNotes.push(note);
            } else {
                bassNotes.push(note)
            }

        });
        this.trebleNotes = [
            new VF.StaveNote(
                {
                    clef: "treble",
                    keys: trebleNotes,
                    duration: "w"
                }
            )
        ];
        for (const [index, element] of trebleNotes.entries()) {
            if (element.includes("#")) {
                this.trebleNotes[0].addAccidental(index, new VF.Accidental("#"))
            }
        }
        this.bassNotes = [
            new VF.StaveNote(
                {
                    clef: "bass",
                    keys: bassNotes,
                    duration: "w"
                }
            )
        ];
        for (const [index, element] of bassNotes.entries()) {
            if (element.includes("#")) {
                this.bassNotes[0].addAccidental(index, new VF.Accidental("#"))
            }
        }
    };

    drawScore = () => {

        // Create a stave of width 200 at position 20, 40 on the canvas.
        this.trebleStave = new VF.Stave(20, 40, 200);
        this.bassStave = new VF.Stave(20, 140, 200);
        const brace = new Vex.Flow.StaveConnector(this.trebleStave, this.bassStave).setType(3);
        const lineLeft = new Vex.Flow.StaveConnector(this.trebleStave, this.bassStave).setType(1);
        const lineRight = new Vex.Flow.StaveConnector(this.trebleStave, this.bassStave).setType(6);


        // Add a clef and time signature.
        this.trebleStave.addClef("treble").addTimeSignature("4/4");
        this.bassStave.addClef("bass").addTimeSignature("4/4");


        this.trebleStave.setContext(this.context).draw();
        this.bassStave.setContext(this.context).draw();
        brace.setContext(this.context).draw();
        lineLeft.setContext(this.context).draw();
        lineRight.setContext(this.context).draw();

    };

    drawNotes = (notes) => {
        if (notes.length === 0) {
            this.context.closeGroup();
            this.context.svg.removeChild(this.group);
            this.group = this.context.openGroup();
            return;
        }
        if (!this.group) {
            this.group = this.context.openGroup();
        }

        this.formatNotes(notes);

         if (this.trebleNotes[0].keys.length > 0) {
            // Create a voice in 4/4 and add the notes from above
            const trebleVoice = new VF.Voice({num_beats: 4,  beat_value: 4});
            trebleVoice.addTickables(this.trebleNotes);

            // Format and justify the notes to 400 pixels.
            const trebbleFormatter = new VF.Formatter().joinVoices([trebleVoice]).format([trebleVoice], 200);

            // Render voice\
            trebleVoice.draw(this.context, this.trebleStave);
        }


        if (this.bassNotes[0].keys.length > 0) {
            // Create a voice in 4/4 and add the notes from above
            const bassVoice = new VF.Voice({num_beats: 4,  beat_value: 4});

            bassVoice.addTickables(this.bassNotes);

            // Format and justify the notes to 400 pixels.

            const bassFormatter = new VF.Formatter().joinVoices([bassVoice]).format([bassVoice], 200);

            bassVoice.draw(this.context, this.bassStave);
        }

    }
}


