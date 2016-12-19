import { Component, OnInit } from '@angular/core';
import {CustomerRepositoryService} from "./customer-repository.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html'
})
export class CustomersComponent implements OnInit {

  customers = [];
  customersSubscription;
  customerDeleteSubscription;

  constructor(private _customerRepo: CustomerRepositoryService, private _router:Router) { }

  ngOnInit() {
      this.customersSubscription = this._customerRepo.getAllEvent.subscribe(
          data => {
              this.customers = data.rows;
          }
      );
      this.customerDeleteSubscription = this._customerRepo.delelteEvent.subscribe(
          data => {
              this.loadCustomers();
          }
      );

      this.loadCustomers();
  }

  loadCustomers(){
      this._customerRepo.getAll();
  }

  deleteCustomer(id){
      this._customerRepo.deleteDoc(id);
  }

  ngOnDestroy(){
      this.customersSubscription.unsubscribe();
      this.customerDeleteSubscription.unsubscribe();
  }

}