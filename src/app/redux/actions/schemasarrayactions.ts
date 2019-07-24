import { Action } from '@ngrx/store';
import { PreparedModel } from '../../Models/modelsArrayModel';

// defining actions
export const SAVE_NEWARRAY = '[NEWARRAY] Add';
// export const REMOVE_SALEITEM = '[SALEITEM] Remove';

// making a class of actions to be able to later intantiate? it.
export class SaveNewArray implements Action {
  readonly type = SAVE_NEWARRAY;
  constructor(public payload: Array<PreparedModel>) {}
}

export type Actions = SaveNewArray;
