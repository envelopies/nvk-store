import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MainLayoutComponent } from '@nvk-store/shared';

@Component({
  templateUrl: './store-main.page.html',
  styleUrl: './store-main.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MainLayoutComponent],
})
export class StoreMainPageComponent {}
