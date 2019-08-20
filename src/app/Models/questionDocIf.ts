export interface QuestionDoc {
  schemaName: string;
  questions: [SingleQuestion];
}

export interface SingleQuestion {
  questionKey: string;
  questionValue: string;
  questionOptions: [string];
}
