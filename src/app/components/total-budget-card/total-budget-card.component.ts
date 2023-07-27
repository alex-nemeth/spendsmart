import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-total-budget-card',
  templateUrl: './total-budget-card.component.html',
})
export class TotalBudgetCardComponent {
  @Input() amount!: number;
}
