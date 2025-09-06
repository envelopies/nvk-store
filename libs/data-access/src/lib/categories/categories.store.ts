import { inject, Injectable } from '@angular/core';
import { CategoriesApi } from './categories.api';
import { finalize, map, Observable, ReplaySubject, switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { ICategory } from './interfaces/category.interface';
import { Category } from './models/category.model';

@Injectable()
export class CategoriesStore {
  private readonly api = inject(CategoriesApi);
  private readonly filters$ = new ReplaySubject<void>(1);

  public readonly categories$ = toSignal(
    this.filters$.pipe(
      switchMap(() =>
        this.api
          .getAll()
          .pipe(map((items: ICategory[]) => items.map((item) => new Category(item)))),
      ),
    ),
    {
      initialValue: [],
    },
  );

  constructor() {
    this.reload();
  }

  public deleteCategory(id: string): Observable<void> {
    return this.api.delete(id).pipe(finalize(() => this.reload()));
  }

  public createCategory(category: Partial<ICategory>): Observable<void> {
    return this.api.create(category).pipe(finalize(() => this.reload()));
  }

  public reload(): void {
    this.filters$.next();
  }
}
