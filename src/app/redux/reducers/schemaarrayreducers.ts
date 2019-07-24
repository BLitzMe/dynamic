import * as SchemaArrayActions from '../actions/schemasarrayactions';
import { PreparedModel } from '../../Models/modelsArrayModel';

const initState: PreparedModel[] = [];

function modelsArrayReducer(
  state: Array<Array<PreparedModel>> = [initState],
  action: SchemaArrayActions.Actions
) {
  switch (action.type) {
    case SchemaArrayActions.SAVE_NEWARRAY:
      return [...state, action.payload];

    default:
      return state;
  }
}

export { modelsArrayReducer };
