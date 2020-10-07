import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api/api.service';
import { filter } from 'src/app/core/utils';

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;

  workspaces: any = [];
  profiles: any = [];

  response = {};
  data = {};

  workspace = new FormControl('');
  name = new FormControl('', Validators.max(280));

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private api: ApiService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.getWorkspaces();
    this.getProfiles();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  getWorkspaces() {
    this.api.get('workspaces', {}).then((res) => {
      this.workspaces = res;
      this.response['workspaces'] = res;
      this.data['workspaces'] = res;
    })
  }

  getProfiles() {
    this.api.get('profiles', {}).then((res) => {
      this.profiles = res;
      this.response['profiles'] = res;
      this.data['profiles'] = res;
    })
  }

  search(e) {
    if (e.cancelable) {
      e.preventDefault();
    }
    const value = e.target.value;
    if (value === "") {
      this.profiles = this.data['profiles'];
      return;
    }
    this.profiles = filter(this.data['profiles'], value);
  }

  filter(value) {
    // Since API is returning similar IDs so i am filtering on "name"
    const workspace = this.workspaces.find((v) => { return v["name"] === value; });
    this.profiles = this.response['profiles'].filter((e) => {
      return workspace.profiles.includes(e.id);
    });
    this.data['profiles'] = this.profiles;
  }
}
