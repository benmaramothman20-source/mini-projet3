import { Component } from '@angular/core';
import { User } from '../model/user.model';
import { Router } from '@angular/router';
import { Auth } from '../services/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-login',
  styles: ``,
 
  templateUrl: './login.html',
})
export class Login {
  user = new User();
  erreur=0;
  

constructor(private authService : Auth,
private router: Router) { }

  onLoggedin()
{
console.log(this.user);
let isValidUser: Boolean = this.authService.SignIn(this.user);
if (isValidUser)
this.router.navigate(['/']);
else
//alert('Login ou mot de passe incorrecte!');
this.erreur=1;
}

}
