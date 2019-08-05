import { ModelsInformationObject } from '../../Models/modelsInformationObjectModel';

export interface SchemasArrayState {
  readonly questionsSchemasArray: Array<Array<ModelsInformationObject>>;
  readonly answersSchemasArray: Array<Array<ModelsInformationObject>>;
}
