import { OverlayRef } from '@angular/cdk/overlay';
import { Subject, Observable } from 'rxjs';

export class DialogRef {
  private readonly afterClosedSubject = new Subject<any>();

  constructor(private readonly overlayRef: OverlayRef) {}

  public close(result?: any): void {
    this.overlayRef.dispose();
    this.afterClosedSubject.next(result);
    this.afterClosedSubject.complete();
  }

  public afterClosed(): Observable<any> {
    return this.afterClosedSubject.asObservable();
  }
}
