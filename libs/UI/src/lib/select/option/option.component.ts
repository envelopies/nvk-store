import { Component, input } from '@angular/core';
import { SelectComponent } from '../select.component';
import { CheckboxComponent } from '../../checkbox/checkbox.component';

@Component({
  selector: 'n-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss'],
  standalone: true,
  imports: [CheckboxComponent],
})
export class OptionComponent<T> {
  public parent?: SelectComponent<T>;
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
