import { Component, OnInit } from '@angular/core';
import { TestTextService } from '../../services/test-text-service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public currentText = '';

  constructor(public testTextService: TestTextService) {   }


  ngOnInit() {
    this.generateText('Easy');
  }

  public generateText(difficulty): void {
    this.currentText = this.testTextService.getRandomTestText(difficulty);
    console.log(this.currentText);
  }
}
