import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Quiz, Question, Choice } from './quiz.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private http: HttpClient) {
  }

  public getQuizzes() {
    return this.http.get(`./assets/quiz-list.json`).pipe(
      map((result: any[]) => {
        return result.map(r => new Quiz(r.label, r.name, r.description, r.fileName));
      })
    );
  }

  public getQuestions(fileName: string) {
    return this.returnQuestions(`./assets/${fileName}.json`);
  }

  public getAPIQuestions(questionConfig) {
    return this.returnQuestions(`https://opentdb.com/api.php?amount=${questionConfig.numQuestions}&category=${questionConfig.subject_id}&type=multiple&difficulty=easy`);
  }

  private returnQuestions(url) {
    return this.http.get(url).pipe(
      map((result: any) => {
        return result.results.map(r => new Question(r.question, this.mapQuestions(r.correct_answer, r.incorrect_answers)));
      })
    );
  }

  private mapQuestions(correct, incorrects): Array<Choice> {
    let choices = [];

    choices.push({ value: correct, correct: true });
    incorrects.forEach(c => {
      choices.push({ value: c, correct: false });
    })
    return choices;
  }
  
}
