import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'n-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {}
