import { Component, OnInit } from '@angular/core';
import {CustomerRepositoryService} from "./customer-repository.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html'
})
export class CustomersComponent implements OnInit {

  customers = [];

  constructor(private _customerRepo: CustomerRepositoryService, private _router:Router) { }

  ngOnInit() {
    this.loadCustomers();
  }

  loadCustomers(){
      this._customerRepo.getAll().then(
          data => {
              this.customers = data.rows;
              console.log(this.customers);
              this.customers.forEach(function(v, i){
                  console.log(v.doc.firstName);
              });
          }
      ).catch(
        err => console.log(err)
      );
  }

  deleteCustomer(id){
      this._customerRepo.getById(id).then(
          data => {
              console.log(data);
              this._customerRepo.deleteDoc(data).then(
                  dData => {
                      console.log(dData);
                      if (dData.ok) {
                          this.loadCustomers();
                      }
                  }
              ).catch(err => console.log(err));
          }
      ).catch(err => console.log(err));
  }

}