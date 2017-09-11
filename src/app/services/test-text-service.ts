
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
            "Computers make excellent and efficient servant, but I have no wish to serve under them. Captain, a starship also runs on loyalty to one man and nothing can replace it or him.",
            "Dave, although you took very thorough precautions in the pod against my hearing you, I could see your lips move.",
            "The key goals in user-interface design are increase in speed of learning and in speed of use, reduction of error rate, encouragement of rapid recall of how to use the interface, and increase in attractiveness to potential users and buyers.",
        ],
        hard: [
            "hard test paragraph1",
            "You think I think that an artist's job is to speak the truth. An artist's job is to captivate you for however long we've asked for your attention. If we stumble into truth we got lucky and I don't get to decide what truth is.",
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
