import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Category } from '@nvk-store/data-access';
import { environment } from '@nvk-store/core';

@Component({
  selector: 'store-category-card',
  templateUrl: './store-category-card.component.html',
  styleUrl: './store-category-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreCategoryCardComponent {
  protected readonly environment = environment;

  public category = input.required<Category>();
}
