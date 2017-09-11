import { Injectable } from '@angular/core';
import { TimerService } from './timer-service';
import { TestTextService } from './test-text-service';

@Injectable()
export class ScoreService {

    public score = 0;
    public wordsPerMin = 0;
    public scoresArray = [];

    constructor(
        private testTextService: TestTextService,
        private timerService: TimerService,
    ) {
        this.scoresArray = JSON.parse(localStorage.getItem('type-test-scores')) || [];
    }

    public calculateWordsPerMinute(index): void {
        this.wordsPerMin = 0;
        this.wordsPerMin = Math.floor(((index + 1) / this.timerService.timer) * 60);
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

    public saveScoreToStorage(selectedDifficulty): void {
        this.scoresArray.push(
            {
                difficulty: selectedDifficulty,
                time: this.timerService.timer,
                wpm: this.wordsPerMin,
                score: this.score,
                date: Date.now()
            });
        localStorage.setItem('type-test-scores', JSON.stringify(this.scoresArray));

    }
}
