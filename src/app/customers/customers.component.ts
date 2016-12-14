import { Component, OnInit } from '@angular/core';
import {CustomerRepositoryService} from "./customer-repository.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html'
})
export class CustomersComponent implements OnInit {

  customers;
  subscription1;

  constructor(private _customerRepo: CustomerRepositoryService, private _router:Router) { }

  ngOnInit() {
    this.loadCustomers();
  }

  loadCustomers(){
      this.subscription1 = this._customerRepo.getAll().subscribe(
          data => {
              this.customers = data.rows
          }
      );
  }

  deleteCustomer(id, rev){
    this.subscription1 = this._customerRepo.deleteById(id, rev).subscribe(
        data => {
          if (data.ok) {
              this.loadCustomers();
          } else {
            alert('Can not delete customer. (Reason: '+data.reason+')')
          }
        }
    );
  }

  ngOnDestroy(){
    this.subscription1.unsubscribe();
  }
}