import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize, timeout } from 'rxjs';
import { TripCard } from '../trip-card/trip-card';
import { Trip } from '../models/trip';
import { trips as mockTrips } from '../data/trips';
import { TripDataService } from '../services/trip-data';

@Component({
  imports: [CommonModule, TripCard],
  selector: 'app-trip-listing',
  styleUrl: './trip-listing.css',
  templateUrl: './trip-listing.html',
})
export class TripListing implements OnInit {
  trips: Trip[] = mockTrips;
  // Render the available trip cards immediately; the API refresh happens in the background.
  loading = false;
  error = '';

  constructor(
    private readonly tripDataService: TripDataService,
    private readonly router: Router,
    private readonly changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.tripDataService.getTrips().pipe(
      // Keep the page from displaying an endless loading message if the API is stopped.
      timeout({ first: 5000 }),
      finalize(() => {
        this.loading = false;
        this.changeDetector.markForCheck();
      })
    ).subscribe({
      next: (trips) => {
        this.trips = trips;
        this.changeDetector.markForCheck();
      },
      error: () => {
        this.error = 'The API is unavailable, so sample trip data is being displayed.';
        this.changeDetector.markForCheck();
      }
    });
  }

  addTrip(): void { this.router.navigate(['/add']); }
}
