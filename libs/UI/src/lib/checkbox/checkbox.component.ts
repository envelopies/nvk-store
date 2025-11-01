import { ChangeDetectionStrategy, Component, forwardRef, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'n-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  standalone: true,
  imports: [CommonModule, IconComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent implements ControlValueAccessor {
  public checked = model(false);

  public writeValue(value: boolean): void {
    this.checked.set(value);
  }

  public registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  public setChecked(value: boolean): void {
    this.checked.set(value);
    this.onChange(value);
  }

  public onCheckboxChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.setChecked(target.checked);
  }

  public onTouched(): void {
    this._onTouched();
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private _onTouched: () => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onChange: (value: boolean) => void = () => {};
}
