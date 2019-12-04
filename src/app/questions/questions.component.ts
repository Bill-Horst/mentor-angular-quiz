import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionsService } from '../questions.service';
import { Quiz, Answers, Choice, Question } from '../quiz.model';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  public userAnswers: Array<any> = [];

  private quiz: Quiz;
  private answers: Answers;
  private questions: Question[];
  private currentQuestionIndex: number;
  private userChoice: any;
  private showResults = false;

  constructor(
    private route: ActivatedRoute,
    private questionsService: QuestionsService
  ) { }

  ngOnInit() {
    if (this.route.snapshot.routeConfig.path !== 'custom') {
      this.questionsService.getQuestions(this.route.snapshot.params.quizId).subscribe(questions => {
        this.questions = questions;
        this.answers = new Answers();
        this.currentQuestionIndex = 0;
      });
    } else {
      this.questionsService.getAPIQuestions(this.route.snapshot.params).subscribe(questions => {
        this.questions = questions;
        this.answers = new Answers();
        this.currentQuestionIndex = 0;
      });
    }
  }

  public updateChoice(choice: Choice) {
    this.answers.values[this.currentQuestionIndex] = choice;
    this.userChoice = choice;
  }

  public nextOrViewResults() {
    this.userAnswers.push({ userChoice: this.userChoice, question: this.questions[this.currentQuestionIndex] });
    if (this.currentQuestionIndex === this.questions.length - 1) {
      this.showResults = true;
      return;
    }
    this.currentQuestionIndex++;
  }

  public reset() {
    this.quiz = undefined;
    this.questions = undefined;
    this.answers = undefined;
    this.currentQuestionIndex = undefined;
  }

}