import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const logged = localStorage.getItem('rol') === 'user';
  if (logged) {
    return true;
  } else {
    const router = inject(Router);
    router.navigate(['/**']);
    return false;
  }
};
