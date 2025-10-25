import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent, InputComponent } from '@nvk-store/UI';

@Component({
  selector: 'n-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [InputComponent, ButtonComponent],
})
export class HeaderComponent {}
