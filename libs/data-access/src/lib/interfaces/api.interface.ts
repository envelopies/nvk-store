import { Observable } from 'rxjs';

export interface IApi<T> {
  getAll(): Observable<T[]>;
  getById(id: string): Observable<T>;
  create(item: Partial<T>): Observable<void>;
  delete(id: string): Observable<void>;
  update(item: Partial<T>): Observable<void>;
}
