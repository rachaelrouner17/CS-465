import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { TripListing } from './trip-listing';
import { TripDataService } from '../services/trip-data';

describe('TripListing', () => {
  let component: TripListing;
  let fixture: ComponentFixture<TripListing>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripListing],
      providers: [
        provideRouter([]),
        { provide: TripDataService, useValue: { getTrips: () => of([]) } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TripListing);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
