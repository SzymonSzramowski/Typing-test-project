import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable, Observer, Subscription } from 'rxjs/Rx';
import { DatePipe } from '@angular/common';

import { TestTextService } from '../../services/test-text-service';
import { ConsoleService } from '../../services/console-service';
import { TimerService } from '../../services/timer-service';
import { ScoreService } from '../../services/score-service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public currentTextArray = [];

  public isTestInProgress = false;

  public isCountdownOn = false;

  public inputError = false;

  private currentWordIndex: number;

  private countdownSubscription: Subscription;

  @ViewChild('rewriteInput')
  private inputElement: ElementRef;

  @ViewChild('selectDifficulty')
  private selectElement: ElementRef;

  constructor(

    private testTextService: TestTextService,
    private consoleService: ConsoleService,
    private timerService: TimerService,
    private scoreService: ScoreService,
    private datePipe: DatePipe,

  ) { }

  ngOnInit() {

    this.generateText('easy');

  }

  public generateText(difficulty): void {

    this.currentTextArray = this.testTextService.getRandomText(difficulty);

  }

  public setTestStatus(): void {

    if (this.isTestInProgress === false) {

      this.wordStatusReset();
      this.scoreService.resetStats();
      this.isTestInProgress = true;
      this.currentWordIndex = 0;
      setTimeout(() => this.lockInput(), 0);
      this.currentTextArray[0].current = true;
      this.startCountdown();


    } else {

      this.isTestInProgress = false;
      this.resetInput();
      this.wordStatusReset();
      this.stopCountdown();
      this.addConsoleAlert('Test stopped');
      this.timerService.stopTimer();

    }
  }

  private checkWord(keyCode, inputValue: string): void {

    const isLastWord = this.currentWordIndex === this.currentTextArray.length - 1;
    const inputValueSufix = isLastWord ? '' : ' ';
    const isCurrentWordCorrect = inputValue === this.currentTextArray[this.currentWordIndex].word + inputValueSufix;
    const spaceKeyCode = 32;

    if (keyCode !== spaceKeyCode && !isLastWord) {
      return;
    }

    this.scoreService.calculateWordsPerMinute(this.currentWordIndex);

    if (isLastWord && isCurrentWordCorrect) {
      this.currentTextArray[this.currentWordIndex].completed = true;
      this.currentTextArray[this.currentWordIndex].current = false;
      this.scoreService.calculateScore(this.selectElement.nativeElement.value);
      this.testComplete();

    } else if (isCurrentWordCorrect) {
      this.currentTextArray[this.currentWordIndex].completed = true;
      this.currentTextArray[this.currentWordIndex].current = false;
      this.currentTextArray[this.currentWordIndex + 1].current = true;
      this.currentWordIndex++;
      this.inputError = false;
      this.resetInput();

    }

  }

  public checkLetter(keyCode, inputValue: string): void {

    const currentText = this.currentTextArray[this.currentWordIndex].word;

    if (inputValue.length === currentText.length && inputValue === currentText.substring(0, inputValue.length)) {
      this.currentTextArray[this.currentWordIndex].completed = true;

    } else {
      this.currentTextArray[this.currentWordIndex].completed = false;
    }

    if (inputValue !== currentText.substring(0, inputValue.length) && inputValue !== currentText + ' ') {
      this.currentTextArray[this.currentWordIndex].error = true;
      this.inputError = true;

    } else if (inputValue === currentText.substring(0, inputValue.length)) {
      this.currentTextArray[this.currentWordIndex].error = false;
      this.inputError = false;
    }

    this.checkWord(keyCode, inputValue);

  }

  public testComplete(): void {
    this.isTestInProgress = false;
    this.scoreService.saveScoreToStorage(this.selectElement.nativeElement.value);
    this.timerService.stopTimer();
    this.addConsoleAlert('Test completed. Total score: ' + this.scoreService.score);
    this.currentWordIndex = 0;
    this.resetInput();
  }

  public getConsoleAlerts(): object {
    return this.consoleService.consoleArray;
  }

  private resetInput(): void {
    this.inputElement.nativeElement.value = '';
  }

  private wordStatusReset(): void {
    for (let i = 0; i < this.currentTextArray.length; i++) {
      this.currentTextArray[i].current = false;
      this.currentTextArray[i].completed = false;
      this.currentTextArray[i].error = false;
    }

  }

  private addConsoleAlert(text: string): void {
    this.consoleService.addAlertToArray(text);
  }

  public lockInput(): void {
    if (this.isTestInProgress === true) {
      this.inputElement.nativeElement.focus();
    }
  }

  private startCountdown(): void {
    this.isCountdownOn = true;
    this.countdownSubscription = Observable.timer(0, 1000).subscribe((time: number) => {
      // ToDo: Refactor 'else if' to switch
      if (time === 0) {
        this.addConsoleAlert('Starting test in 3...');
      } else if (time === 1) {
        this.addConsoleAlert('2...');
      } else if (time === 2) {
        this.addConsoleAlert('1...');
      } else if (time === 3) {
        this.isCountdownOn = false;
        this.addConsoleAlert('GO!');
        this.timerService.startTimer();
      }
    });
  }

  private stopCountdown(): void {
    this.countdownSubscription.unsubscribe();
    this.isCountdownOn = false;
  }

  public getTimer(): string {
    return this.datePipe.transform(this.timerService.timer * 1000, 'mm:ss');
  }
  public getWPM(): number {
    return this.scoreService.wordsPerMin;
  }
}
