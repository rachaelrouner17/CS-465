import { inject } from '@angular/core';
import { CanActivateFn, Router, Routes } from '@angular/router';
import { TripListing } from './trip-listing/trip-listing';
import { AddTrip } from './add-trip/add-trip';
import { EditTrip } from './edit-trip/edit-trip';
import { Login } from './login/login';
import { AuthenticationService } from './services/authentication';

const authGuard: CanActivateFn = (_route, state) => {
  const authentication = inject(AuthenticationService);
  if (authentication.isLoggedIn()) return true;
  return inject(Router).createUrlTree(['/login'], {
    queryParams: { returnUrl: state.url }
  });
};

export const routes: Routes = [
  { path: '', component: TripListing },
  { path: 'login', component: Login },
  { path: 'add', component: AddTrip, canActivate: [authGuard] },
  { path: 'edit/:code', component: EditTrip, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];
