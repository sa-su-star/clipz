import { OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export class UnsubscribeOnDestroyAdapter implements OnDestroy {
  private readonly destroy$ = new Subject<void>();

  protected untilDestroyed<T>(): (source: Observable<T>) => Observable<T> {
    return (source: Observable<T>) => source.pipe(takeUntil(this.destroy$));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
