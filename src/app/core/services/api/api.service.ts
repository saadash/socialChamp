import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { LoadingService } from "../loading/loading.service";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  loading: any;

  constructor(
    private httpClient: HttpClient,
    private loadingService: LoadingService,
  ) { }

  async get(
    path: string,
    params: any,
    loading: boolean = false,
    backdrop: boolean = false
  ) {
    const token = localStorage.getItem("access");
    const headers = new HttpHeaders().set("Authorization", "Token " + token);
    if (loading && !this.loading) {
      this.loading = await this.loadingService.presentLoading(backdrop);
    }
    return this.httpClient
      .get(`${environment.api}${path}`, { headers, params })
      .toPromise()
      .then((res) => {
        if (this.loading) {
          this.loading.dismiss();
          this.loading = null;
        }
        if (
          res
        ) {
          return res;
        } else {

        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
