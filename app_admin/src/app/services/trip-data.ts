import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Trip } from '../models/trip';

@Injectable({ providedIn: 'root' })
export class TripDataService {
  // Angular's dev server proxies /api to the Express server on port 3000.
  // Keeping this relative also avoids browser cross-port/CORS issues.
  private readonly url = '/api/trips';

  constructor(private readonly http: HttpClient) {}

  getTrips(): Observable<Trip[]> { return this.http.get<Trip[]>(this.url); }

  getTrip(code: string): Observable<Trip> {
    return this.http.get<Trip | Trip[]>(`${this.url}/${encodeURIComponent(code)}`).pipe(
      map((result) => Array.isArray(result) ? result[0] : result)
    );
  }

  addTrip(trip: Trip): Observable<Trip> { return this.http.post<Trip>(this.url, trip); }

  updateTrip(code: string, trip: Trip): Observable<Trip> {
    return this.http.put<Trip>(`${this.url}/${encodeURIComponent(code)}`, trip);
  }

  deleteTrip(code: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${encodeURIComponent(code)}`);
  }
}
