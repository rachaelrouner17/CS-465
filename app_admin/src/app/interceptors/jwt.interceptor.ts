import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthenticationService } from '../services/authentication';

// Attach the JWT to API requests when a user is signed in.
export const jwtInterceptor: HttpInterceptorFn = (request, next) => {
  const token = inject(AuthenticationService).token;
  if (!token || !request.url.startsWith('/api/')) return next(request);

  return next(request.clone({
    setHeaders: { Authorization: `Bearer ${token}` }
  }));
};
