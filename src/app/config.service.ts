import { Injectable } from '@angular/core';

export interface Option {
  name: string;
  selected: boolean;
  value: string;
  subOption?: Option[];
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }

  operations: Option = {
    name: 'Select All',
    selected: true,
    value: '',
    subOption: [
      { name: 'A + B = C', selected: true, value: 'add' },
      { name: 'A - B = C', selected: true, value: 'subtract' },
      { name: 'A &times; B = C', selected: true, value: 'multiply' },
      { name: 'A &divide; B = C', selected: true, value: 'divide' },
    ],
  };

  minA: number = 1;
  maxA: number = 999;
  minB: number = 1;
  maxB: number = 999;

  negative: string = 'false';
  integer: string = 'true';
  difficulty: string = "c";

  numLines: number = 21;
  numColl: number = 3;

  fontType: string = 'dotted';
  fontSize: number = 34;

  getOpetations(): string[] {
    if (this.operations.subOption == null) {
      return [];
    }
    return this.operations.subOption.filter(t => t.selected).map( item => item.name );
  }
}
