import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'n-icon',
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  public size = input(24);
}
