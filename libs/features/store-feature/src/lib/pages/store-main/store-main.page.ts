import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MainLayoutComponent } from '@nvk-store/shared';
import { ButtonComponent } from '@nvk-store/UI';
import { CategoriesStore, provideCategoriesDataAccess } from '@nvk-store/data-access';
import { toSignal } from '@angular/core/rxjs-interop';
import { CategoryCardComponent } from '../../components/category-card/category-card.component';

@Component({
  templateUrl: './store-main.page.html',
  styleUrl: './store-main.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MainLayoutComponent, ButtonComponent, CategoryCardComponent],
  providers: [provideCategoriesDataAccess()],
})
export class StoreMainPageComponent {
  private readonly categoriesStore = inject(CategoriesStore);

  public categories = toSignal(this.categoriesStore.categories$, { initialValue: [] });
}
