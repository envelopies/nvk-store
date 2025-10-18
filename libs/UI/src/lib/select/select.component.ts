import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  DestroyRef,
  ElementRef,
  forwardRef,
  inject,
  input,
  OnDestroy,
  output,
  QueryList,
  signal,
  TemplateRef,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { take } from 'rxjs';
import { OptionComponent } from './option/option.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'n-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
})
export class SelectComponent<T> implements ControlValueAccessor, AfterContentInit, OnDestroy {
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly overlay = inject(Overlay);
  private readonly elementRef = inject(ElementRef);
  private readonly vcr = inject(ViewContainerRef);

  public placeholder = input('');
  public multiple = input(false);
  public isOpen = signal(false);

  public openedChange = output<boolean>();
  public panelTemplate = viewChild<TemplateRef<any>>('panel');

  @ContentChildren(OptionComponent)
  public options!: QueryList<OptionComponent<T>>;

  public selected: T[] = [];
  public overlayRef?: OverlayRef;

  public ngAfterContentInit(): void {
    this.options.changes
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.bindOptionClicks());

    this.bindOptionClicks();
  }

  public ngOnDestroy(): void {
    this.close();
  }

  public writeValue(value: T[] | T | null): void {
    if (this.multiple()) {
      this.selected = Array.isArray(value) ? value : value ? [value] : [];
    } else {
      this.selected = value ? [value as T] : [];
    }
    this.markSelectedOptions();
  }

  public registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public togglePanel(): void {
    this.overlayRef ? this.close() : this.open();
  }

  public selectOption(option: OptionComponent<T>): void {
    if (this.multiple()) {
      const index = this.selected.indexOf(option.value());
      if (index > -1) {
        this.selected.splice(index, 1);
      } else {
        this.selected.push(option.value());
      }
      this.onChange(this.selected);
    } else {
      this.selected = [option.value()];
      this.onChange(this.selected[0]);
      this.close();
    }

    this.markSelectedOptions();
    this.cdr.markForCheck();
  }

  private markSelectedOptions(): void {
    this.options?.forEach((opt) => {
      opt.selected = this.selected.includes(opt.value());
    });
  }

  public get displayValue(): string {
    if (!this.selected.length) return '';

    const selectedOptions =
      this.options?.filter((opt) => this.selected.includes(opt.value())) ?? [];

    return this.multiple()
      ? selectedOptions.map((opt) => opt.label()).join(', ')
      : selectedOptions[0]?.label();
  }

  private open(): void {
    const hostElement = this.elementRef.nativeElement as HTMLElement;
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(hostElement)
      .withPositions([{ originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top' }]);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      scrollStrategy: this.overlay.scrollStrategies.close(),
      width: hostElement.offsetWidth,
    });

    const portal = new TemplatePortal(this.panelTemplate()!, this.vcr);
    this.overlayRef.attach(portal);
    this.openedChange.emit(true);
    this.isOpen.set(true);

    this.overlayRef
      .backdropClick()
      .pipe(take(1))
      .subscribe(() => this.close());
  }

  private close(): void {
    this.overlayRef?.dispose();
    this.overlayRef = undefined;
    this.openedChange.emit(false);
    this.isOpen.set(false);
    this.onTouched();
  }

  private bindOptionClicks(): void {
    this.options.forEach((option) => {
      option.registerParent(this);
    });
  }

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};
}
