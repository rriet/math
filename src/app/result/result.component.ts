import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html'
})
export class ResultComponent implements OnInit {

  constructor(
    public conf: ConfigService
  ) { }

  ngOnInit(): void {
    this.generateTable();
  }

  teste: string = ''
  teste2: number = 0
  exercises: string[][] = [];

  generateTable() {


    for (let l = 0; l < this.conf.numLines; l++) {
      let line: string[] = [];
      for (let c = 0; c < this.conf.numColl; c++) {

        // Random operation
        let oper = this.conf.getOpetations()[this.randomNumber(0, this.conf.getOpetations().length - 1)];

        let a: number | undefined = undefined;
        let b: number | undefined = undefined;
        let c: number | undefined = undefined;
        let operString: string = '';

        // Determin what to do depending on type of operation
        // if sum
        if (oper === 'A + B = C') {
          operString = ' + ';
          a = this.randomNumber(this.conf.minA, this.conf.maxA);
          b = this.randomNumber(this.conf.minB, this.conf.maxB);
          c = a + b;
        }

        // if subtraction
        if (oper === 'A - B = C') {
          operString = ' - ';
          while (c === undefined || (c < 0 && this.conf.negative === 'false')) {
            a = this.randomNumber(this.conf.minA, this.conf.maxA);
            b = this.randomNumber(this.conf.minB, this.conf.maxB);
            c = a - b;
          }
        }

        // if multiply
        if (oper === 'A &times; B = C') {
          operString = ' &times; ';
          a = this.randomNumber(this.conf.minA, this.conf.maxA);
          b = this.randomNumber(this.conf.minB, this.conf.maxB);
          c = a * b;
        }

        // if divide
        if (oper === 'A &divide; B = C') {
          operString = ' &divide; ';

          // get only integer result, unless option select
          while (c === undefined || (Math.round(c) != c && this.conf.integer === 'true')) {
            a = this.randomNumber(this.conf.minA, this.conf.maxA);
            // avoid division by zero
            while (b === undefined || b === 0) {
              b = this.randomNumber(this.conf.minB, this.conf.maxB);
            }
            c = a / b;
          }
        }

        if (this.conf.difficulty === 'c') {
          line.push(a + operString + b + ' = ____');
        } else {
          let randNum = this.randomNumber(1, 3);
          switch (randNum) {
            case 1:
              line.push(a + operString + b + ' = ____');
              break;

            case 2:
              line.push(a + operString + '____' + ' = ' + c);
              break;

            default:
              line.push('____' + operString + b + ' = ' + c);
              break;
          }
        }


      }
      this.exercises.push(line);
    }
  }

  randomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
