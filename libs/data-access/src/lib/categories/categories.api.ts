import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IApi } from '../interfaces/api.interface';
import { environment } from '@nvk-store/core';
import { ICategory } from './interfaces/category.interface';

@Injectable()
export class CategoriesApi implements IApi<ICategory> {
  private readonly http = inject(HttpClient);

  public create(item: Partial<ICategory>): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/categories`, item);
  }

  public delete(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/categories/${id}`);
  }

  public getAll(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`${environment.apiUrl}/categories`);
  }

  public getById(id: string): Observable<ICategory> {
    return this.http.get<ICategory>(`${environment.apiUrl}/categories/${id}`);
  }

  public update(item: Partial<ICategory>): Observable<void> {
    return this.http.put<void>(`${environment.apiUrl}/categories/${item.id}`, item);
  }
}
