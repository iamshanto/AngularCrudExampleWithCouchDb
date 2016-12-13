import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CustomersComponent } from './customers/customers.component';
import { CustomerCreateComponent } from './customers/customer-create/customer-create.component';
import { CustomerViewComponent } from './customers/customer-view/customer-view.component';
import {DbService} from "./db.service";
import {AppRoutes} from "./app.route";
import {CustomerRepositoryService} from "./customers/customer-repository.service";

@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
    CustomerCreateComponent,
    CustomerViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    AppRoutes
  ],
  providers: [DbService, CustomerRepositoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }