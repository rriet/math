import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../config.service';

export interface Option {
  name: string;
  selected: boolean;
  value: string;
  subOption?: Option[];
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class MainComponent implements OnInit {

  constructor(
    public conf:ConfigService
  ) { }

  ngOnInit(): void {
  }

  updateAllComplete(targetOption: Option): boolean {
    return targetOption.subOption != null && targetOption.subOption.every(t => t.selected);
  }

  someComplete(targetOption: Option): boolean {
    if (targetOption.subOption == null) {
      return false;
    }
    return targetOption.subOption.filter(t => t.selected).length > 0 && !this.updateAllComplete(targetOption);
  }

  setAll(selected: boolean, targetOption: Option) {
    if (targetOption.subOption == null) {
      return;
    }
    targetOption.subOption.forEach(t => (t.selected = selected));
  }
}
