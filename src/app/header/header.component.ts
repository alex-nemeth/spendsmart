import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  @Output() addTrackerClick = new EventEmitter<void>();

  onAddTrackerClick() {
    this.addTrackerClick.emit();
  }
}
