
import { Routes } from '@angular/router';
import { MakeupComponent } from './makeup/makeup';
import { AddMakeup } from './add-makeup/add-makeup';
import { UpdateMakeup } from './update-makeup/update-makeup';
import { RecherchePartype } from './recherche-partype/recherche-partype';
import { RechercheParNom } from './recherche-par-nom/recherche-par-nom';
import { Login } from './login/login';
import { Forbidden } from './forbidden/forbidden';
import { makeupGuard } from './makeup-guard';
import { Listetype } from './listetype/listetype';

export const routes: Routes = [
  { path: 'makeup', component: MakeupComponent },
  { path: 'add-makeup', component: AddMakeup ,canActivate:[makeupGuard] },
  { path: 'updateMakeup/:id', component: UpdateMakeup },
  { path: '', redirectTo: 'makeup', pathMatch: 'full' },
  {path: "recherchePartype", component : RecherchePartype},
  {path: 'login', component: Login},
  {path: 'app-forbidden', component: Forbidden},
  { path: 'listeTypes', component: Listetype },
  {path: "rechercheParNom", component : RechercheParNom}

];