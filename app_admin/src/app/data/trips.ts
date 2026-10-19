import { Trip } from '../models/trip';

export const trips: Trip[] = [
  {
    code: 'GALR210214', name: 'Gale Reef', length: '4 nights / 5 days',
    start: '2024-02-12T08:00:00Z', resort: 'Emerald Bay, 3 stars',
    perPerson: '799.00', image: 'reef1.jpg',
    description: 'Gale Reef offers clear water, colorful coral, and an unforgettable diving experience.'
  },
  {
    code: 'DAWR210315', name: "Dawson's Reef", length: '4 nights / 5 days',
    start: '2024-03-15T08:00:00Z', resort: 'Blue Lagoon, 4 stars',
    perPerson: '1199.00', image: 'reef2.jpg',
    description: "Dawson's Reef features lively fish, bright coral, and a memorable underwater adventure."
  },
  {
    code: 'CLAR210621', name: "Claire's Reef", length: '4 nights / 5 days',
    start: '2024-06-21T08:00:00Z', resort: 'Sea Breeze, 5 stars',
    perPerson: '1999.00', image: 'reef3.jpg',
    description: "Claire's Reef combines vibrant marine life and beautiful coral for a relaxing getaway."
  }
];
