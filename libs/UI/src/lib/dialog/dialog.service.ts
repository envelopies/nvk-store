import { Overlay, ComponentType } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, Injector, inject, ComponentRef } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { DialogRef } from './dialog-ref';
import { DIALOG_DATA } from './dialog.token';
import { DialogContainerComponent } from './dialog-container/dialog-container.component';
import { take } from 'rxjs';

export interface DialogConfig {
  // eslint-disable-next-line
  data?: any;
}

@Injectable({ providedIn: 'root' })
export class DialogService {
  private readonly overlay = inject(Overlay);
  private readonly injector = inject(Injector);
  private readonly breakpointObserver = inject(BreakpointObserver);

  public open<T>(component: ComponentType<T>, config?: DialogConfig): DialogRef {
    const isMobile = this.breakpointObserver.isMatched(Breakpoints.Handset);

    const positionStrategy = isMobile
      ? this.overlay.position().global().bottom('0').centerHorizontally()
      : this.overlay.position().global().centerHorizontally().centerVertically();

    const overlayRef = this.overlay.create({
      positionStrategy,
      hasBackdrop: true,
      backdropClass: 'overlay-backdrop',
      panelClass: 'overlay-panel',
    });

    const dialogRef = new DialogRef(overlayRef);

    const injector = Injector.create({
      parent: this.injector,
      providers: [
        { provide: DialogRef, useValue: dialogRef },
        { provide: DIALOG_DATA, useValue: config?.data },
      ],
    });

    overlayRef
      .backdropClick()
      .pipe(take(1))
      .subscribe(() => {
        dialogRef.close();
      });

    const containerPortal = new ComponentPortal(DialogContainerComponent, null, injector);
    const containerRef = overlayRef.attach(
      containerPortal,
    ) as ComponentRef<DialogContainerComponent>;

    containerRef.instance.load(component);

    return dialogRef;
  }
}
