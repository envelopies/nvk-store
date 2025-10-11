import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'n-icon',
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  @Input()
  public size = 14;
}
