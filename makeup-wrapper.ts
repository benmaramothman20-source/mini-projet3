import { Makeup } from './makeup.model';

export class MakeupWrapper {
  _embedded!: {
    makeuppps: Makeup[];
  };
}