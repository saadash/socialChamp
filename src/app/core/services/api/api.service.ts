import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  loading: any;

  constructor(
    private httpClient: HttpClient,
  ) { }

  async get(
    path: string,
    params: any,
  ) {
    return this.httpClient
      .get(`${environment.api}${path}`, { params })
      .toPromise()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
