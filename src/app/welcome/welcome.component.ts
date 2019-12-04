import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../questions.service';
import { Quiz } from '../quiz.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  public quizzes: any;
  public questionNum: number = 10;
  public subjects: Array<any>;
  public customTestSelected: any;
  
  private testConfig: any = {};

  constructor(
    private questionService: QuestionsService,
    private router: Router) {
    this.questionService.getQuizzes().subscribe(quiz => {
      this.quizzes = quiz;
    });
    this.subjects = this.getSubjects();
    this.customTestSelected = this.subjects[0];
  }

  ngOnInit() {

  }

  public quizChosen(quiz) {
    this.router.navigate([quiz.name])
  }

  public testConfigured() {
    this.testConfig.numQuestions = this.questionNum;
    this.testConfig.subject_id = this.customTestSelected.category_id;
    this.router.navigate(['custom', this.testConfig]);
  }

  private getSubjects() {
    return [
      {
        name: 'General',
        category_id: 9
      },
      {
        name: 'Books',
        category_id: 10
      },
      {
        name: 'TV',
        category_id: 14
      },
      {
        name: 'Mythology',
        category_id: 20
      },
      {
        name: 'Anime / Manga',
        category_id: 31
      }
    ];
  }

}
