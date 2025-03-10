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

  public search(pageControl?: PageControl, filters?: any): Observable<ApiResponsePageable<facility>> {
    const params: any = { ...pageControl, ...filters };    
    const queryString = new URLSearchParams(params).toString();    
    return this._http.get<ApiResponsePageable<facility>>(`${environment.api}/${this.endpoint}/search${queryString}`);    
  }

  public getById(id: number): Observable<any> {
    return this._http.get<any>(`${environment.api}/${this.endpoint}/${id}`);
  }

  public create(facility: facility): Observable<ApiResponse<facility>> {
    return this._http.post<ApiResponse<facility>>(`${environment.api}/${this.endpoint}/create`, facility);
  }

  public getPhotos(facilityId: number): Observable<{ data: { id: number; path: string }[] }> {
    return this._http.get<{ data: { id: number; path: string }[] }>(
      `${environment.api}/${this.endpoint}/${facilityId}/images`
    );
  }
  

  public uploadFile(id: number, facility: FormData): Observable<any> {
    return this._http.post<any>(`${environment.api}/${this.endpoint}/upload-image/${id}`, facility);
  }

  public update(id: number, facility: facility): Observable<ApiResponse<facility>> {
    return this._http.patch<ApiResponse<facility>>(`${environment.api}/${this.endpoint}/${id}`, facility);
  }

  public delete(id: number): Observable<DeleteApiResponse> {
    return this._http.delete<DeleteApiResponse>(`${environment.api}/${this.endpoint}/${id}`);
  }

  public deleteImage(id: number): Observable<DeleteApiResponse> {
    return this._http.delete<DeleteApiResponse>(`${environment.api}/${this.endpoint}/image/${id}`);
  }

  

}



