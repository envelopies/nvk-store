import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'n-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input()
  public variant: 'outlined' | 'filled' = 'filled';

  @Input()
  public theme: 'white' | 'green' = 'green';

  @Input()
  public disabled = false;
}
