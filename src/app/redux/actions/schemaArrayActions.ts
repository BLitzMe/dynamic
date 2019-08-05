import { createAction, props } from '@ngrx/store';
import { ModelsInformationObject } from '../../Models/modelsInformationObjectModel';

// defining actions
export const saveNewQuestionsArray = createAction(
  '[NEW_QUESTIONS_SCHEMA_ARRAY] Add Question',
  props<{ questionsSchemasArray: any }>()
);
export const saveNewAnswersArray = createAction(
  '[NEW_ANSWERS_SCHEMA_ARRAY] Add Answer',
  props<{ questionsArray: any }>()
);
// export const REMOVE_SALEITEM = '[SALEITEM] Remove';
/* 
// making a class of actions to be able to later intantiate? it.
export class SaveNewArray implements Action {
  readonly type = SAVE_NEW_QUESTIONS_SCHEMAS_ARRAY;
  constructor(public payload: Array<ModelsInformationObject>) {}
}

export type Actions = SaveNewArray;
 */
