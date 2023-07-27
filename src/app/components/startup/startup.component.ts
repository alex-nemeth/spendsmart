import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-startup',
  template: '',
})
export class StartupComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe((user) => {
      user ? this.router.navigate(['']) : this.router.navigate(['/login']);
    });
  }
}
