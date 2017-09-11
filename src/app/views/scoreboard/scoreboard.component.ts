import { Component, OnInit } from '@angular/core';
import { ScoreService } from '../../services/score-service';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit {

  constructor(private scoreService: ScoreService) { }

  ngOnInit() {
  }

  public getScoreList(): object {
    const scoreList = this.scoreService.scoresArray;
    scoreList.sort(function(a, b) {
      return parseFloat(b.score) - parseFloat(a.score);
  });
    scoreList.splice(10);
    return scoreList;
  }
}
