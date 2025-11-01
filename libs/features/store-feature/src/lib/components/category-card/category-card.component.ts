import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Category } from '@nvk-store/data-access';
import { environment } from '@nvk-store/core';

@Component({
  selector: 'category-card',
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryCardComponent {
  public category = input.required<Category>();
  protected readonly environment = environment;
}
