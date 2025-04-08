import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  const logged = localStorage.getItem('rol') === 'admin';
  console.log(localStorage)
  if (logged) {
    return true;
  } else {
    const router = inject(Router);
    router.navigate(['/**']);
    return false;
  }
};
