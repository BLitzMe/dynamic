import { SchemasArrayState } from './../states/questionsschemasarraystate';
import * as SchemaArrayActions from '../actions/schemaArrayActions';
import { ModelsInformationObject } from '../../Models/modelsInformationObjectModel';
import { Action, createReducer, on } from '@ngrx/store';

const initState: SchemasArrayState = {
  questionsSchemasArray: [],
  answersSchemasArray: []
};

const schemasArrayReducer = createReducer(
  initState,
  on(SchemaArrayActions.saveNewQuestionsArray, state => ({
    ...state,
    questionsSchemasArray: state.questionsSchemasArray
  })),
  on(SchemaArrayActions.saveNewAnswersArray, state => ({
    ...state,
    answersSchemasArray: state.answersSchemasArray
  }))
);

export function schemasArrayReducerFunction(
  state: SchemasArrayState | undefined,
  action: Action
) {
  return schemasArrayReducer(state, action);
}
/* function questionsSchemasArrayReducer(
  state: Array<Array<ModelsInformationObject>> = [initState],
  action: SchemaArrayActions.Actions
) {
  switch (action.type) {
    case SchemaArrayActions.SAVE_NEW_QUESTIONS_SCHEMAS_ARRAY:
      return [...state, action.payload]; //jippe

    default:
      return state;
  }
}

export { questionsSchemasArrayReducer };
 */
