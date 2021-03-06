import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean;

  user;
  constructor(
    private authService: AuthService,
    private router: Router,
    public afAuth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    /* this.user = this.authService.getUserClaims();
    this.isLoggedIn = !!this.authService.getUserClaims(); */
    this.afAuth.authState.subscribe((user) => (this.user = user));
  }

  logout(): void {
    this.authService.doLogout().finally(() => {
      this.router.navigate(['/home']);
    });
  }
}
