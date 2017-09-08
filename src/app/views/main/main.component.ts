import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TestTextService } from '../../services/test-text-service';
import { ConsoleService } from '../../services/console-service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public currentTextArray = [];

  public isTestInProgress = false;

  public inputError = false;

  private currentWordIndex: number;

  @ViewChild('rewriteInput')
  private inputElement: ElementRef;

  constructor(

    public testTextService: TestTextService,
    public consoleService: ConsoleService,

  ) { }

  ngOnInit() {

    this.generateText('easy');

  }

  public generateText(difficulty): void {

    const getText = this.testTextService.getRandomText(difficulty);
    this.currentTextArray = getText;

  }

  public setTestStatus(): void {

    if (this.isTestInProgress === false) {

      this.wordStatusReset();
      this.isTestInProgress = true;
      this.currentWordIndex = 0;
      setTimeout(() => this.lockInput(), 0);
      this.currentTextArray[0].current = true;
      this.addConsoleAlert('Starting test');

    } else {

      this.isTestInProgress = false;
      this.resetInput();
      this.wordStatusReset();
      this.addConsoleAlert('Test stopped');

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

    if (isLastWord && isCurrentWordCorrect) {
      this.currentTextArray[this.currentWordIndex].completed = true;
      this.currentTextArray[this.currentWordIndex].current = false;
      this.isTestInProgress = false;
      this.addConsoleAlert('Test completed');
      this.currentWordIndex = 0;
      this.resetInput();

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

  public getConsoleAlerts(): object {
    return this.consoleService.consoleArray.reverse();
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

}
