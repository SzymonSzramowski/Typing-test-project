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

  private wordIndexCounter: number;

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

  public startTest(): void {
    if (this.isTestInProgress === false) {

      this.isTestInProgress = true;
      this.wordIndexCounter = 0;
      setTimeout(() => this.inputElement.nativeElement.focus(), 0);
      this.consoleService.addAlertToArray('Starting test');

    } else {

      this.isTestInProgress = false;
      this.consoleService.addAlertToArray('Test stopped');

    }

  }

  public checkWord(keyCode, inputValue: string): void {
    if (this.wordIndexCounter === this.currentTextArray.length - 1) {
      if (inputValue === this.currentTextArray[this.wordIndexCounter].word) {
        this.currentTextArray[this.wordIndexCounter].completed = true;
        this.isTestInProgress = false;
        this.consoleService.addAlertToArray('Test completed');
        this.wordIndexCounter = 0;
        this.inputElement.nativeElement.value = '';
      }
    }
    if (inputValue === this.currentTextArray[this.wordIndexCounter].word + ' ') {
      this.currentTextArray[this.wordIndexCounter].completed = true;
      this.wordIndexCounter++;
      this.inputElement.nativeElement.value = '';
    }
  }
}
