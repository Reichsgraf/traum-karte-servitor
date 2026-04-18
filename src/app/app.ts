import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import { Clipboard } from '@angular/cdk/clipboard';
import {formatDate, DecimalPipe} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatDivider } from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTooltipModule} from '@angular/material/tooltip';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButton,
    MatAutocompleteModule,
    MatDivider,
    MatCardModule,
    DecimalPipe,
    MatExpansionModule,
    MatTooltipModule
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
      startPointHeight: new FormControl('175'),
      startPointDistance: new FormControl('0'),
      riftPointHeight: new FormControl('170'),
      riftPointDistance: new FormControl('14'),
      targetPointHeight: new FormControl('140'),
      targetPointDistance: new FormControl('16'),
    });
  }

  ngOnInit() {

  }

  precise(n: number, digits=1) {
    return parseFloat(n.toFixed(digits));
  }

  calculate() {
    this.launched = true;
    const x0 = this.formGroup.get("startPointDistance")?.value?.replace(",", ".");
    const y0 = this.formGroup.get("startPointHeight")?.value?.replace(",", ".");
    const x1 = this.formGroup.get("riftPointDistance")?.value.replace(",", ".");
    const y1 = this.formGroup.get("riftPointHeight")?.value.replace(",", ".");
    const x2 = this.formGroup.get("targetPointDistance")?.value.replace(",", ".");
    const y2 = this.formGroup.get("targetPointHeight")?.value.replace(",", ".");

    this.result = (y2 - y1) / this.precise(x2 - x1) * (x0 - x1) + Number(y1) - y0;
  }
}
