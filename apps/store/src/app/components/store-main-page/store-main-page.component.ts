import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MainLayoutComponent } from '@nvk-store/shared';
import { ButtonComponent, IconComponent } from '@nvk-store/UI';
import {
  CategoriesStore,
  ProductsStore,
  provideCategoriesDataAccess,
  provideProductsDataAccess,
} from '@nvk-store/data-access';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductCardComponent } from '@nvk-store/product';
import { StoreCategoryCardComponent } from '../store-category-card/store-category-card.component';

@Component({
  templateUrl: './store-main-page.component.html',
  styleUrl: './store-main-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MainLayoutComponent,
    ButtonComponent,
    StoreCategoryCardComponent,
    ProductCardComponent,
    IconComponent,
  ],
  providers: [provideCategoriesDataAccess(), provideProductsDataAccess()],
})
export class StoreMainPageComponent {
  private readonly categoriesStore = inject(CategoriesStore);
  private readonly productsStore = inject(ProductsStore);

  public categories = toSignal(this.categoriesStore.categories$, { initialValue: [] });
  public productSelection = toSignal(this.productsStore.productsSelection$, { initialValue: [] });
}
