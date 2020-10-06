import { Injectable } from "@angular/core";
import { LoadingController } from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class LoadingService {
  constructor(private loadingController: LoadingController) {}

  public async presentLoading(showBackdrop) {
    const loading = await this.loadingController.create({
      message: "Please wait...",
      showBackdrop,
    });
    await loading.present();
    return loading;
  }
}
