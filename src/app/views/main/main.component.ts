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

  public isInputDisabled = true;

  public isTestInProgress = false;

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
    console.log(this.currentTextArray);

  }

  public startTest(): void {
    if (this.isTestInProgress === false) {

      this.isInputDisabled = false;
      this.isTestInProgress = true;
      this.consoleService.addAlertToArray('Starting test');

    } else {

      this.isInputDisabled = true;
      this.isTestInProgress = false;
      this.consoleService.addAlertToArray('Test stopped');

    }

  }
}
