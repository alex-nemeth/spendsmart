import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  constructor(private auth: AngularFireAuth) {}

  @Output() addTrackerClick = new EventEmitter<void>();

  onAddTrackerClick() {
    this.addTrackerClick.emit();
  }

  logOut() {
    this.auth
      .signOut()
      .then(() => console.log('Signed out'))
      .catch((error) => console.error(error));
  }
}
