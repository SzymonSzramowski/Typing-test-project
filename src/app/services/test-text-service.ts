
import { Injectable } from '@angular/core';
import { TextBaseSplit } from './text-base-interface';

@Injectable()
export class TestTextService {

    private saveIndex: number;

    private testTextBase = {
        easy: [
            "easy test paragraph1",
            "easy test paragraph2",
            "easy test paragraph3",
            "easy test paragraph4",
        ],
        medium: [
            "medium test paragraph1",
            "medium test paragraph2",
            "medium test paragraph3",
            "medium test paragraph4",
        ],
        hard: [
            "hard test paragraph1",
            "hard test paragraph2",
            "Creativity is just connecting things. When you ask creative people how they did something, they feel a little guilty because they didn't really do it, they just saw something. It seemed obvious to them after a while. That's because they were able to connect experiences they've had and synthesize new things.",
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur dictum urna at enim ultrices blandit. Praesent ligula odio, bibendum eu imperdiet convallis, mollis quis ligula. Nulla condimentum vulputate odio a bibendum. Sed dapibus ligula felis. Cras hendrerit, nunc pretium ullamcorper luctus, ex ipsum aliquet mauris, eu mattis augue felis id enim. Cras eget rhoncus sapien. Cras ullamcorper risus id ipsum eleifend, a pharetra turpis tempor.",
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
            textSplit.push({word: randomText[i], current: false, completed: false, error: false});
        }
        return textSplit;
    }
}
