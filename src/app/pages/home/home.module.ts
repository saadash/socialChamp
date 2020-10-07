import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { HomePage } from "./home.page";
import { MaterialModule } from "src/app/core/modules/material/material.module";
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: "",
        component: HomePage
      }
    ]),
    ReactiveFormsModule,
    MaterialModule,
  ],
  declarations: [HomePage]
})
export class HomePageModule { }
