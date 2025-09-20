import { inject, Injectable } from '@angular/core';
import { CategoriesApi } from './categories.api';
import { finalize, map, BehaviorSubject, switchMap, shareReplay, Observable } from 'rxjs';
import { ICategory } from './interfaces/category.interface';
import { Category } from './models/category.model';
import { IFilter } from '../../interfaces/filters.interface';

@Injectable()
export class CategoriesStore {
  private readonly api = inject(CategoriesApi);
  private readonly filters$ = new BehaviorSubject<Partial<IFilter>>({});

  public readonly categories$ = this.filters$.pipe(
    switchMap((filters) =>
      this.api
        .getAll(filters)
        .pipe(map((items: ICategory[]) => items.map((item) => new Category(item)))),
    ),
    shareReplay(1),
  );

  public deleteCategory(id: string): Observable<void> {
    return this.api.delete(id).pipe(finalize(() => this.reload()));
  }

  public createCategory(category: Partial<ICategory>): Observable<void> {
    return this.api.create(category).pipe(finalize(() => this.reload()));
  }

  public reload(filters?: Partial<IFilter>): void {
    this.filters$.next(filters || {});
  }
}
