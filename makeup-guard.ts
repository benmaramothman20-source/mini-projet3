import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from './services/auth';



export const makeupGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
const router = inject(Router);
if (auth.isAdmin())
return true;
else {
router.navigate(['app-forbidden']);
return false;
}


 
};
