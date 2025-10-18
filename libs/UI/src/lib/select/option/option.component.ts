import { Component, input } from '@angular/core';
import { SelectComponent } from '../select.component';

@Component({
  selector: 'n-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss'],
  standalone: true,
})
export class OptionComponent<T> {
  private parent?: SelectComponent<T>;

  public value = input.required<T>();
  public label = input.required<string>();

  public selected = false;

  public registerParent(parent: SelectComponent<T>): void {
    this.parent = parent;
  }

  public onClick(): void {
    this.parent?.selectOption(this);
  }
}
