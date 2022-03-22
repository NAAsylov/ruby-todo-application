import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {

  readonly ROOT_URL;

  constructor(private http: HttpClient) {
    this.ROOT_URL = 'https://localhost:5000'; /* URL API сервера */
  }

  get(uri: string, payload: Object, ) {
    return this.http.get(`${this.ROOT_URL}/${uri}`, {observe: 'response'});
  }

  post(uri: string, payload: Object) {
    return this.http.post(`${this.ROOT_URL}/${uri}`, payload, {observe: 'response'});
  }

  patch(uri: string) {
    return this.http.patch(`${this.ROOT_URL}/${uri}`, {}, {observe: 'response'});
  }

}
