import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { PageControl, ApiResponsePageable, ApiResponse, DeleteApiResponse } from '@models/application';
import { component } from '@models/component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComponentService {

  public endpoint = 'component';

  constructor(
    private readonly _http: HttpClient
  ) { }

  public search(pageControl?: PageControl, filters?: any): Observable<ApiResponsePageable<component>> {
    const params: any = { ...pageControl, ...filters };    
    const queryString = new URLSearchParams(params).toString();    
    return this._http.get<ApiResponsePageable<component>>(`${environment.api}/${this.endpoint}/search?${queryString}`);
  }

  public getById(id: number): Observable<ApiResponsePageable<component>> {
    return this._http.get<ApiResponsePageable<component>>(`${environment.api}/${this.endpoint}/${id}`);
  }

  public create(component: component|FormData): Observable<ApiResponse<component>> {
    return this._http.post<ApiResponse<component>>(`${environment.api}/${this.endpoint}/create`, component);
  }

  public update(id: number, component: component|FormData): Observable<ApiResponse<component>> {
    return this._http.post<ApiResponse<component>>(`${environment.api}/${this.endpoint}/${id}?_method=PATCH`, component);
  }

  public delete(id: number): Observable<DeleteApiResponse> {
    return this._http.delete<DeleteApiResponse>(`${environment.api}/${this.endpoint}/${id}`);
  }

}



