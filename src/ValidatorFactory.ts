import { Validator } from './Validator';

export interface ValidatorFactory {
  loadValidator(name: string): Promise<Validator>;
}
