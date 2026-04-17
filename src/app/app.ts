import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MAT_DATE_LOCALE, provideNativeDateAdapter} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTimepickerModule} from '@angular/material/timepicker';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import { Clipboard } from '@angular/cdk/clipboard';
import {formatDate, DecimalPipe} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatButton,
    MatTimepickerModule,
    MatAutocompleteModule,
    MatDivider,
    DecimalPipe
  ],
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'uk-UA' }
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: true
})
export class App implements OnInit {
  protected formGroup: FormGroup;
  protected result: number = 0;
  protected launched: boolean = false;

  constructor(
    private clipboard: Clipboard,
    @Inject(LOCALE_ID) private locale: string
  ) {
    const currentDate: Date = new Date();

    this.formGroup = new FormGroup({
      startPointHeight: new FormControl(''),
      riftPointHeight: new FormControl(''),
      riftPointDistance: new FormControl(''),
      targetPointHeight: new FormControl(''),
      targetPointDistance: new FormControl(''),
    });
  }

  ngOnInit() {

  }

  precise(n: number, digits=1) {
    return parseFloat(n.toFixed(digits));
  }

  calculate() {
    this.launched = true;
    const y0 = this.formGroup.get("startPointHeight")?.value;
    const x1 = this.formGroup.get("riftPointDistance")?.value;
    const y1 = this.formGroup.get("riftPointHeight")?.value;
    const x2 = this.formGroup.get("targetPointDistance")?.value;
    const y2 = this.formGroup.get("targetPointHeight")?.value;

    this.result = ((-1) * (y2 - y1) / this.precise(x2 - x1) * x1 + Number(y1) - y0);
  }
}
