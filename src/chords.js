import { detect } from '@tonaljs/chord';

export class ChordManager {
    constructor(elementId) {
        this.container = document.getElementById(elementId);

    }
    identify = (notes) => {
        const detectedChords = this.weightPossibleChords(detect(notes));
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
                weight += 5;
            }
            if (chord.includes("7")) {
                weight += 7;
            }
            if (chord.includes("9")) {
                weight += 9;
            }
            if (chord.includes("11")) {
                weight += 11;
            }
            if (chord.includes("13")) {
                weight += 13;
            }
            return [chord, weight]
        });
        const sortedWeightedChords = weightedChords.sort((item_a, item_b) => {
            return item_b[1] - item_a[1]
        });
        return sortedWeightedChords.map((item) => item[0])

    };

}


