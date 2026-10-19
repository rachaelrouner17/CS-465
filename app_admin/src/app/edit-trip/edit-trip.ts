import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Trip } from '../models/trip';
import { TripDataService } from '../services/trip-data';

@Component({
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  selector: 'app-edit-trip',
  templateUrl: './edit-trip.html'
})
export class EditTrip implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  tripCode = '';
  loading = true;
  saving = false;
  error = '';

  form = this.formBuilder.nonNullable.group({
    code: ['', Validators.required],
    name: ['', Validators.required],
    length: ['', Validators.required],
    start: ['', Validators.required],
    resort: ['', Validators.required],
    perPerson: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
    image: ['', Validators.required],
    description: ['', Validators.required]
  });

  constructor(
    private readonly tripDataService: TripDataService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.tripCode = this.route.snapshot.paramMap.get('code') || '';
    this.tripDataService.getTrip(this.tripCode).subscribe({
      next: (trip) => {
        this.form.patchValue({ ...trip, start: trip.start.slice(0, 10) });
        this.loading = false;
        this.changeDetector.markForCheck();
      },
      error: () => {
        this.loading = false;
        this.error = 'The requested trip could not be found.';
        this.changeDetector.markForCheck();
      }
    });
  }

  onSubmit(): void {
    this.error = '';
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving = true;
    const trip = this.form.getRawValue() as Trip;
    this.tripDataService.updateTrip(this.tripCode, trip).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => {
        this.saving = false;
        this.error = err.error?.message || 'The trip could not be updated.';
        this.changeDetector.markForCheck();
      }
    });
  }

  deleteTrip(): void {
    if (!window.confirm(`Delete ${this.form.controls.name.value}?`)) return;
    this.tripDataService.deleteTrip(this.tripCode).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => {
        this.error = err.error?.message || 'The trip could not be deleted.';
        this.changeDetector.markForCheck();
      }
    });
  }
}
