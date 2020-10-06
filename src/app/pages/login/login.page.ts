import { Component } from "@angular/core";
import { MenuController, NavController } from "@ionic/angular";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ApiService } from "src/app/core/services/api/api.service";
import { ToastService } from "src/app/core/services/toast/toast.service";
import { LoadingService } from "src/app/core/services/loading/loading.service";
import { isVosAuthenticated } from "src/app/core/utils";
import { DataService } from "src/app/core/services/data/data.service";

@Component({
  selector: "app-login",
  templateUrl: "login.page.html",
  styleUrls: ["login.page.scss"],
})
export class LoginPage {
  hide = true;
  loginForm: FormGroup;

  deviceId: string;
  deviceToken: string;

  constructor(
    private menuCtrl: MenuController,
    private fb: FormBuilder,
    private router: Router,
    private api: ApiService,
    private toast: ToastService,
    private loading: LoadingService,
    private data: DataService,
    public navCtrl: NavController
  ) {
    this.createForm();
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(false);
  }

  ionViewDidLeave() {
    this.menuCtrl.enable(true);
  }

  createForm() {
    this.loginForm = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  get username() {
    return this.loginForm.get("username");
  }

  get password() {
    return this.loginForm.get("password");
  }

  async login(value) {
    if (this.loginForm.valid) {
      const loading = await this.loading.presentLoading(true);
      let form = new FormData();
      for (var key in value) {
        form.append(key, value[key]);
      }
      this.api
        .login("/login/", form)
        .toPromise()
        .then((res) => {
          loading.dismiss();
          const token = res["token"];
          localStorage.setItem("access", token);
          this.api.get("/user_info/", {}, true, true).then((res) => {
            if (res) {
              const role = res["data"]["role"];
              localStorage.setItem("id", res["data"]["user_id"]);
              localStorage.setItem("role", role);
              localStorage.setItem("name", res["data"]["name"]);
              this.data.emitName(res["data"]["name"]);
              if (isVosAuthenticated()) {
                this.data.emitIsVosAuthenticated(true);
              } else {
                this.data.emitIsVosAuthenticated(false);
              }

              this.api
                .get(
                  "/user_management/mob_get_permission_dict_user_wise/",
                  {},
                  true,
                  true
                )
                .then((res) => {
                  let permissions = res["data"];
                  permissions["role"] = role;
                  localStorage.setItem(
                    "permissions",
                    JSON.stringify(permissions)
                  );
                  this.data.emitPermissions(permissions);
                  if (role !== "su") {
                    localStorage.setItem(
                      "credentials",
                      JSON.stringify({
                        username: this.username.value,
                        password: this.password.value,
                      })
                    );
                    this.navCtrl.navigateRoot("/otp-authentication");
                  } else {
                    this.router.navigate(["/users-list"], {
                      replaceUrl: true,
                    });
                  }
                });
            }
          });
        })
        .catch((err) => {
          loading.dismiss();
          this.toast.presentToast(
            "danger",
            "bottom",
            err.error.non_field_errors[0],
            3000
          );
          console.log(err);
        });
    }
  }
}
