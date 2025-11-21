import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Product } from '@nvk-store/data-access';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
  public product = input.required<Product>();
}
