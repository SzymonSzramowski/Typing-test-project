import { Injectable } from '@angular/core';

@Injectable()
export class TestTextService {

    private saveIndex: number;

    public testTextBase = {
        Easy: [
            'easy test paragraph1',
            'easy test paragraph2',
            'easy test paragraph3',
            'easy test paragraph4',
        ],
        Medium: [
            'medium test paragraph1',
            'medium test paragraph2',
            'medium test paragraph3',
            'medium test paragraph4',
        ],
        Hard : [
            'hard test paragraph1',
            'hard test paragraph2',
            'hard test paragraph3',
            'hard test paragraph4',
        ],
    };

    public getRandomTestText(difficulty: string): string {
        const randomIndex = Math.floor(Math.random() * this.testTextBase[difficulty].length);
        if (randomIndex === this.saveIndex) {
            return this.getRandomTestText(difficulty);
        } else {
            this.saveIndex = randomIndex;
            return this.testTextBase[difficulty][randomIndex];
        }
    }
}
