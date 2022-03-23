import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ITodoWithId, IProject } from "../../types";

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {

  readonly ROOT_URL;

  constructor(private http: HttpClient) {
    this.ROOT_URL = 'http://localhost:5000'; /* URL API сервера */
  }

  get(uri: string, payload: Object) {
    return this.http.get<IProject[]>(`${this.ROOT_URL}/${uri}`, {observe: 'response'});
  }

  post(uri: string, payload: Object) {
    return this.http.post<ITodoWithId>(`${this.ROOT_URL}/${uri}`, payload, {observe: 'response'});
  }

  patch(uri: string) {
    return this.http.patch<ITodoWithId>(`${this.ROOT_URL}/${uri}`, {}, {observe: 'response'});
  }

}
