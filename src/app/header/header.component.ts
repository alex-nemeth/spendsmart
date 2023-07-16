import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  constructor(private authService: AuthService) {}

  @Output() addTrackerClick = new EventEmitter<void>();

  onAddTrackerClick() {
    this.addTrackerClick.emit();
  }

  logOut() {
    this.authService.logOut();
  }
}
