import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isLoading = false;
  form = this.fb.group({
    units: [0, [Validators.required, Validators.min(1)]],
    costs: this.fb.array([this.fb.control(0, [Validators.min(0)])]),
    expense: [0, [Validators.required, Validators.min(1)]],
    expenses: this.fb.array([this.fb.control(0, [Validators.min(0)])]),
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
    console.log('🚀 ~ file: home.component.ts ~ line 18 ~ HomeComponent ~ constructor ~ this.form', this.form);
    this.isLoading = true;
  }

  addCost(): void {
    this.costs.push(this.fb.control(0, [Validators.min(0)]));
  }

  removeCost(index: number): void {
    this.costs.removeAt(index);
  }

  addExpense(): void {
    this.expenses.push(this.fb.control(0, [Validators.min(0)]));
  }

  removeExpense(index: number): void {
    this.expenses.removeAt(index);
  }

  onSubmit(): void {
    console.log(this.form.value);

    if (this.form.invalid) return;
  }
}
