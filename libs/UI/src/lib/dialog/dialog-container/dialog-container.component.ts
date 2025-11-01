import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
  OnInit,
  signal,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ComponentType } from '@angular/cdk/overlay';
import { DialogRef } from '../dialog-ref';
import { DIALOG_DATA } from '../dialog.token';
import { IconComponent } from '../../icon/icon.component';

@Component({
  templateUrl: './dialog-container.component.html',
  styleUrls: ['./dialog-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
})
export class DialogContainerComponent implements OnInit {
  private readonly dialogRef = inject(DialogRef);
  private readonly dialogData = inject(DIALOG_DATA);

  @ViewChild('content', { read: ViewContainerRef, static: true })
  public content!: ViewContainerRef;

  public title = signal('');

  public ngOnInit(): void {
    const dialogData = this.dialogData as { title: string };
    this.title.set(dialogData?.title || '');
  }

  public load<T>(component: ComponentType<T>): void {
    this.content.clear();
    this.content.createComponent(component);
  }

  public close(): void {
    this.dialogRef.close();
  }

  @HostListener('window:keydown.esc')
  public handleEsc(): void {
    this.close();
  }
}
