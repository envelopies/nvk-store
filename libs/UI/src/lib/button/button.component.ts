import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'n-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
})
export class ButtonComponent {
  public variant = input<'outlined' | 'filled'>('filled');
  public theme = input<'white' | 'green'>('green');
  public disabled = input(false);
  public size = input<'small' | 'simple'>('simple');
  public iconStart = input('');
  public iconEnd = input('');
}
