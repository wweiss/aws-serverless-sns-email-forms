import { Validator } from './Validator';

export interface ValidatorFactory {
  loadValidator(schema: string | object): Promise<Validator>;
}
