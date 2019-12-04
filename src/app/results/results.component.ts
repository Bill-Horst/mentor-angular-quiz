import { Component, OnInit, Input } from '@angular/core';
import { Answers } from '../quiz.model';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  // @Input() answers: Answers;
  @Input() userAnswers: any;

  constructor() {
  }

  ngOnInit() {
    this.userAnswers.map(ans => {
      ans.correctAnswer = ans.question.choices.find(choice => choice.correct);
    });
  }

}
