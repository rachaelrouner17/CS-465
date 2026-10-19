import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Trip } from '../models/trip';

@Component({
  imports: [RouterLink],
  selector: 'app-trip-card',
  styleUrl: './trip-card.css',
  templateUrl: './trip-card.html',
})
export class TripCard {
  @Input() trip!: Trip;
}
