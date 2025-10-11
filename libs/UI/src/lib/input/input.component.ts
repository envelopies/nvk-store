import { ChangeDetectionStrategy, Component, forwardRef, input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'n-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
  imports: [IconComponent],
})
export class InputComponent implements ControlValueAccessor {
  public placeholder = input('');
  public type = input<'text' | 'number'>('text');
  public iconStart = input('');
  public iconEnd = input('');

  public value: string | number = '';

  public writeValue(value: string | number): void {
    this.value = value ?? '';
  }

  public registerOnChange(fn: (value: string | number) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public onInput(event: Event): void {
    const inputEl = event.target as HTMLInputElement;
    const newValue = this.type() === 'number' ? Number(inputEl.value) : inputEl.value;

    this.value = inputEl.value;
    this.onChange(newValue);
    this.onTouched();
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onTouched: () => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onChange: (value: string | number) => void = () => {};
}
