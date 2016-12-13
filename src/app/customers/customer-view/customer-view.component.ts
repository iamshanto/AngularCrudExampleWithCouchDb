import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CustomerRepositoryService} from "../customer-repository.service";

@Component({
  selector: 'app-customer-view',
  templateUrl: './customer-view.component.html',
  styles: []
})
export class CustomerViewComponent implements OnInit {

  customer;
  subscription1;
  subscription2;

  constructor(private _customerRepo: CustomerRepositoryService, private _activeRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.subscription1 = this._activeRoute.params.subscribe(
        param => {
          this.getCustomerById(param['id']);
        }
    );
  }

  getCustomerById(id){
    this.subscription2 = this._customerRepo.getById(id).subscribe(
        data => {
          this.customer = data;
        }
    );
  }

  ngOnDestroy(){
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
  }
}