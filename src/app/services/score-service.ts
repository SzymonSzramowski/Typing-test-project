import { Injectable } from '@angular/core';
import { TimerService } from './timer-service';
import { TestTextService } from './test-text-service';

@Injectable()
export class ScoreService {

    constructor(
        private testTextService: TestTextService,
        private timerService: TimerService,
    ) { }

    public score = 0;
    public wordsPerMin = 0;

    public calculateWordsPerMinute(index): void {
        this.wordsPerMin = 0;
        this. wordsPerMin = Math.floor(((index + 1) / this.timerService.timer) * 60);
    }

    public calculateScore(difficulty): void {
        if (difficulty === 'easy') {
            this.score = this.wordsPerMin * 105;
        } else if (difficulty === 'medium') {
            this.score = this.wordsPerMin * 110;
        } else if (difficulty === 'hard') {
            this.score = this.wordsPerMin * 125;
        }
    }

    public resetStats(): void {
        this.score = 0;
        this.wordsPerMin = 0;
        this.timerService.timer = 0;
    }
}
