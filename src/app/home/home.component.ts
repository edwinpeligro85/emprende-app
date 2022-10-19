import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { codeFranzs } from '@app/@shared/utils';
import { Report } from './interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isLoading = false;
  report: Report | null = null;
  form = this.fb.group({
    unit: [0, [Validators.required, Validators.min(1)]],
    costs: this.fb.array([
      this.fb.group({
        name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(45)]],
        value: [0, [Validators.min(1)]],
      }),
    ]),
    avgGain: [null, [Validators.min(1), Validators.max(100)]],
    expense: [0, [Validators.required, Validators.min(1)]],
    expenses: this.fb.array([
      this.fb.group({
        name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(45)]],
        value: [0, [Validators.min(1)]],
      }),
    ]),
    acceptTerms: [false, Validators.requiredTrue],
  });

  get costs(): FormArray {
    return this.form.get('costs') as FormArray;
  }

  get expenses(): FormArray {
    return this.form.get('expenses') as FormArray;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.isLoading = true;
  }

  addItemToForm(control: 'costs' | 'expenses'): void {
    this[control].push(
      this.fb.group({
        name: ['', [Validators.minLength(3), Validators.maxLength(45)]],
        value: [0, [Validators.min(0)]],
      })
    );
  }

  removeItemFromForm(control: 'costs' | 'expenses', index: number): void {
    this[control].removeAt(index);
  }

  onlyNumbers(e: KeyboardEvent) {
    return codeFranzs(e);
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const form = this.form.value;
    const unit = form.unit ?? 1;
    const avgGain = form.avgGain ?? 10;
    const totalCosts = form.costs?.map((item) => item.value).reduce((a, v) => (a ?? 0) + (v ?? 0)) ?? 0;
    const totalExpenses = form.expenses?.map((item) => item.value).reduce((a, v) => (a ?? 0) + (v ?? 0)) ?? 0;
    const totalAmount = totalCosts + totalExpenses;
    const costByUnit = totalAmount / unit;
    const avgGainByUnit = (costByUnit * avgGain) / 100;
    const gainByUnit = costByUnit + avgGainByUnit;
    const totalBilled = gainByUnit * unit;
    const totalGain = totalBilled - totalAmount;

    this.report = {
      unit,
      avgGain,
      totalCosts,
      totalExpenses,
      totalAmount,
      costByUnit,
      avgGainByUnit,
      gainByUnit,
      totalGain,
      totalBilled,
    };
  }
}
