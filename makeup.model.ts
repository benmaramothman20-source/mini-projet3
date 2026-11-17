import { type } from "./type.model";

export class Makeup {
  idMakeup?: number;
  nomMakeup!: string;
  prix!: number;
  dateCreation!: Date;
  type?: type;
}
