import { inject, Injectable } from '@angular/core';
import { finalize, map, BehaviorSubject, switchMap, shareReplay, Observable } from 'rxjs';
import { IFilter } from '../../interfaces/filters.interface';
import { ProductsApi } from './products.api';
import { Product } from './models/product.model';
import { IProduct } from './interfaces/product.interface';

@Injectable()
export class ProductsStore {
  private readonly api = inject(ProductsApi);
  private readonly filters$ = new BehaviorSubject<Partial<IFilter>>({});

  public readonly products$ = this.filters$.pipe(
    switchMap((filters) =>
      this.api
        .getAll(filters)
        .pipe(map((items: IProduct[]) => items.map((item) => new Product(item)))),
    ),
    shareReplay(1),
  );

  public readonly productsSelection$ = this.api.getProductsSelection().pipe(
    map((products) => products.map((product) => new Product(product))),
    shareReplay(1),
  );

  public deleteProduct(id: string): Observable<void> {
    return this.api.delete(id).pipe(finalize(() => this.reload()));
  }

  public createProduct(product: Partial<IProduct>): Observable<void> {
    return this.api.create(product).pipe(finalize(() => this.reload()));
  }

  public reload(filters?: Partial<IFilter>): void {
    this.filters$.next(filters || {});
  }
}
