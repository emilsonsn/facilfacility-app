import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { PageControl, ApiResponsePageable, ApiResponse, DeleteApiResponse } from '@models/application';
import { facility } from '@models/facility';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacilityService {

  public endpoint = 'facility';

  constructor(
    private readonly _http: HttpClient
  ) { }

  public getActions(pageControl?: PageControl, filters?: any): Observable<ApiResponsePageable<facility>> {
    const params: any = { ...pageControl, ...filters };    
    const queryString = new URLSearchParams(params).toString();    
    return this._http.get<ApiResponsePageable<facility>>(`${environment.api}/${this.endpoint}/search${queryString}`);
  }

  public getById(id: number): Observable<ApiResponsePageable<facility>> {

    return this._http.get<ApiResponsePageable<facility>>(`${environment.api}/${this.endpoint}/search`);
  }

  public postAction(facility: facility): Observable<ApiResponse<facility>> {
    return this._http.post<ApiResponse<facility>>(`${environment.api}/${this.endpoint}/${this.endpoint}`, facility);
  }

  public patchAction(id: number, facility: facility): Observable<ApiResponse<facility>> {
    return this._http.patch<ApiResponse<facility>>(`${environment.api}/${this.endpoint}/${id}`, facility);
  }

  public deleteAction(id: number): Observable<DeleteApiResponse> {
    return this._http.delete<DeleteApiResponse>(`${environment.api}/${this.endpoint}/${id}`);
  }

}



