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

      this.isTestInProgress = true;
      this.currentWordIndex = 0;
      setTimeout(() => this.inputElement.nativeElement.focus(), 0);
      this.addConsoleAlert('Starting test');

    } else {

      this.isTestInProgress = false;
      this.resetInput();
      this.wordStatusReset();
      this.addConsoleAlert('Test stopped');

    }
  }

  public checkWord(keyCode, inputValue: string): void {

    if (this.currentWordIndex === this.currentTextArray.length - 1) {
      if (inputValue === this.currentTextArray[this.currentWordIndex].word) {
        this.currentTextArray[this.currentWordIndex].completed = true;
        this.isTestInProgress = false;
        this.addConsoleAlert('Test completed');
        this.currentWordIndex = 0;
        this.resetInput();

      }
    }

    if (inputValue === this.currentTextArray[this.currentWordIndex].word + ' ') {
      this.currentTextArray[this.currentWordIndex].completed = true;
      this.currentWordIndex++;
      this.resetInput();

    }

  }

  public getConsoleAlerts(): object {
    return this.consoleService.consoleArray.reverse();
  }

  private resetInput(): void {
    this.inputElement.nativeElement.value = '';
  }

  private wordStatusReset(): void {
    for (let i = 0; i < this.currentTextArray.length; i++) {
      this.currentTextArray[i].completed = false;
    }

  }
  private addConsoleAlert(text: string): void {
    this.consoleService.addAlertToArray(text);
  }

}
