import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Trip } from '../models/trip';
import { TripDataService } from '../services/trip-data';

@Component({
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  selector: 'app-add-trip',
  templateUrl: './add-trip.html'
})
export class AddTrip {
  private readonly formBuilder = inject(FormBuilder);
  submitted = false;
  saving = false;
  error = '';

  form = this.formBuilder.nonNullable.group({
    code: ['', Validators.required],
    name: ['', Validators.required],
    length: ['', Validators.required],
    start: ['', Validators.required],
    resort: ['', Validators.required],
    perPerson: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
    image: ['reef1.jpg', Validators.required],
    description: ['', Validators.required]
  });

  constructor(
    private readonly tripDataService: TripDataService,
    private readonly router: Router
  ) {}

  onSubmit(): void {
    this.submitted = true;
    this.error = '';
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving = true;
    const trip = this.form.getRawValue() as Trip;
    this.tripDataService.addTrip(trip).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => {
        this.saving = false;
        this.error = err.error?.message || 'The trip could not be added.';
      }
    });
  }
}
