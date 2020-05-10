import { detect } from '@tonaljs/chord';

export class ChordManager {
    constructor(elementId) {
        this.container = document.getElementById(elementId);

    }
    identify = (notes) => {
        const detectedChords = this.weightPossibleChords(detect(notes));
        console.log(detectedChords);
        if (detectedChords.length > 0) {
            this.container.innerText = detectedChords[0];
        } else {
            this.container.innerText = ''
        }

    };

    weightPossibleChords = (chords) => {
        const weightedChords = chords.map((chord) => {
            let weight = 1;
            if (chord.includes("M")) {
                weight += 10;
            }
            if (chord.includes("7")) {
                weight += 10;
            }
            console.log(chord, weight);
            return [chord, weight]
        });
        const sortedWeightedChords = weightedChords.sort((item_a, item_b) => {
            return item_b[1] - item_a[1]
        });
        console.log(sortedWeightedChords);
        return sortedWeightedChords.map((item) => item[0])

    };

}


