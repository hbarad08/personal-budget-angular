import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:3000/data';
  private data: any;

  constructor(private http: HttpClient) { }

  fetchData(): Observable<any> {
    if (!this.data) {
      return this.http.get<any>(this.apiUrl).pipe(
        tap((response: any) => {
          this.data = response;
        })
      );
    } else {
      return of(this.data);
    }
  }
}
