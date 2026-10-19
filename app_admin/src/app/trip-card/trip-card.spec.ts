import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TripCard } from './trip-card';

describe('TripCard', () => {
  let component: TripCard;
  let fixture: ComponentFixture<TripCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripCard],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(TripCard);
    component = fixture.componentInstance;
    component.trip = {
      code: 'TEST1', name: 'Test Trip', length: '1 day', start: '2024-01-01',
      resort: 'Test Resort', perPerson: '100.00', image: 'reef1.jpg', description: 'Test description'
    };
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
