import { SchemasArrayState } from './../states/questionsschemasarraystate';
import { createSelector } from '@ngrx/store';
import { schemasArrayReducerFunction } from '../reducers/questionsschemaarrayreducers';

export const selectQuestionsSchemaArray = (state: SchemasArrayState) =>
  state.answersSchemasArray;

export const selectAnswersSchemaArray = (state: SchemasArrayState) =>
  state.questionsSchemasArray;
