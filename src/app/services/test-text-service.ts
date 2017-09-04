import { Injectable } from '@angular/core';
import { TextBaseSplit } from './text-base-interface';

@Injectable()
export class TestTextService {

    private saveIndex: number;

    private testTextBase = {
        easy: [
            'easy test paragraph1',
            'easy test paragraph2',
            'easy test paragraph3',
            'easy test paragraph4',
        ],
        medium: [
            'medium test paragraph1',
            'medium test paragraph2',
            'medium test paragraph3',
            'medium test paragraph4',
        ],
        hard: [
            'hard test paragraph1',
            'hard test paragraph2',
            'hard test paragraph3',
            'hard test paragraph4',
        ],
    };

    public randomizeText(difficulty: string): string {

        const randomIndex = Math.floor(Math.random() * this.testTextBase[difficulty].length);
        if (randomIndex === this.saveIndex) {
            return this.randomizeText(difficulty);
        } else {
            this.saveIndex = randomIndex;
            return this.testTextBase[difficulty][randomIndex];
        }
    }

    public getRandomText(difficulty: string) {
        const textSplit: TextBaseSplit[] = [];
        const randomText = this.randomizeText(difficulty).split(' ');
        for (let i = 0; i < randomText.length; i++) {
            textSplit.push({word: randomText[i], completed: false});
        }
        return textSplit;
    }
}
