import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  @Output() addTrackerClick = new EventEmitter<void>();
  @Output() logOutClick = new EventEmitter<void>();

  onAddTrackerClick() {
    this.addTrackerClick.emit();
  }

  logOut() {
    this.logOutClick.emit();
  }
}
