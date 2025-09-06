import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@nvk-store/core';

export class BaseAPI<T extends { id: string }> {
  private readonly endpoint: string;

  protected readonly http = inject(HttpClient);

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  public create(item: Partial<T>): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/${this.endpoint}`, item);
  }

  public delete(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/${this.endpoint}/${id}`);
  }

  public getAll(): Observable<T[]> {
    return this.http.get<T[]>(`${environment.apiUrl}/${this.endpoint}`);
  }

  public getById(id: string): Observable<T> {
    return this.http.get<T>(`${environment.apiUrl}/${this.endpoint}/${id}`);
  }

  public update(item: Partial<T>): Observable<void> {
    return this.http.put<void>(`${environment.apiUrl}/${this.endpoint}/${item.id}`, item);
  }
}
