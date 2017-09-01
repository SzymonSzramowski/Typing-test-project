import { Component, OnInit, ViewChild } from '@angular/core';
import { TestTextService } from '../../services/test-text-service';

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
  ) {   }

  ngOnInit() {
    this.generateText('easy');
  }

  public generateText(difficulty): void {
    const getText = this.testTextService.getRandomTestText(difficulty);
    this.currentTextArray = getText.split(' ');
    console.log(this.currentTextArray);
  }

  public startTest(): void {
    this.isInputDisabled = false;
    this.isTestInProgress = true;
  }
}
