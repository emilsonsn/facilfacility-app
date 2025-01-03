import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { action } from '@models/action';
import { PageControl, ApiResponsePageable, ApiResponse, DeleteApiResponse } from '@models/application';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  public endpoint = 'action';

  constructor(
    private readonly _http: HttpClient
  ) { }

  public getActions(pageControl?: PageControl, filters?: any): Observable<ApiResponsePageable<action>> {
    const params: any = { ...pageControl, ...filters };    
    const queryString = new URLSearchParams(params).toString();    
    return this._http.get<ApiResponsePageable<action>>(`${environment.api}/${this.endpoint}/search${queryString}`);
  }

  public getById(id: number): Observable<ApiResponsePageable<action>> {

    return this._http.get<ApiResponsePageable<action>>(`${environment.api}/${this.endpoint}/search`);
  }

  public postAction(action: action): Observable<ApiResponse<action>> {
    return this._http.post<ApiResponse<action>>(`${environment.api}/${this.endpoint}/create`, action);
  }

  public patchAction(id: number, action: action|FormData): Observable<ApiResponse<action>> {
    return this._http.post<ApiResponse<action>>(`${environment.api}/${this.endpoint}/${id}?_method=PATCH`, action);
  }

  public deleteAction(id: number): Observable<DeleteApiResponse> {
    return this._http.delete<DeleteApiResponse>(`${environment.api}/${this.endpoint}/${id}`);
  }

}



