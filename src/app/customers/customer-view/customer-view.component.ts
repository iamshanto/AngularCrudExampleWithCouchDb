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
  paramSubscription;
  getByIdSubscription;

  constructor(private _customerRepo: CustomerRepositoryService, private _activeRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.paramSubscription = this._activeRoute.params.subscribe(
        param => {
          this._customerRepo.getById(param['id']);
        }
    );

    this.getByIdSubscription = this._customerRepo.getByIdEvent.subscribe(
        data => {
          this.customer = data
        }
    );
  }

  ngOnDestroy(){
    this.paramSubscription.unsubscribe();
    this.getByIdSubscription.unsubscribe();
  }
}