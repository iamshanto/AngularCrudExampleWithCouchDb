import { Component, OnInit } from '@angular/core';
import {CustomerRepositoryService} from "../customer-repository.service";
import {FormGroup, FormBuilder, Validators, FormArray} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styles: []
})
export class CustomerCreateComponent implements OnInit {

  customer;
  customerForm:FormGroup;
  subscription1;
  constructor(private _customerRepo: CustomerRepositoryService, private _fb: FormBuilder, private _router: Router) {
  }

  ngOnInit() {
    this.customerForm = this._fb.group({
      'firstName': this._fb.control(this.customer?this.customer.firstName:'', Validators.required),
      'lastName': this._fb.control(this.customer?this.customer.lastName:'', Validators.required),
      'email': this._fb.control(this.customer?this.customer.email:'', Validators.required),
      'contactNumbers': this._fb.array([this.createContactFormGroup()])
    });
  }

  onSumbit(){
    this.subscription1 = this._customerRepo.save(this.customerForm.value).subscribe(
        (data:any) => {
          if (data.ok){
            this._router.navigate(['']);
          } else {
            alert(data.reason);
          }
        }
    );
  }

  addContactNumberFormGroup(){
    (<FormArray>this.customerForm.get('contactNumbers')).push(
        this.createContactFormGroup()
    );
  }

  createContactFormGroup(){
    return this._fb.group({
      'number': this._fb.control('', Validators.required),
      'type': this._fb.control('', Validators.required)
    });
  }

  removeContactNumber(n){
    let controls = <FormArray>this.customerForm.get('contactNumbers');
    controls.removeAt(n);
  }
}
