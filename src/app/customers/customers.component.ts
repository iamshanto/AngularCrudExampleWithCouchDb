import { Component, OnInit } from '@angular/core';
import {CustomerRepositoryService} from "./customer-repository.service";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html'
})
export class CustomersComponent implements OnInit {

  customers;
  subscription1;

  constructor(private _customerRepo: CustomerRepositoryService) { }

  ngOnInit() {
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
            this._customerRepo.getAll();
          } else {
            alert('Can not delete customer. (Reason: '+data.reason+')')
          }
          console.log(data);
        }
    );
  }

  ngOnDestroy(){
    this.subscription1.unsubscribe();
  }
}