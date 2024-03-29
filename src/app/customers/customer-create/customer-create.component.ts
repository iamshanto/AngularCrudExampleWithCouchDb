import { Component, OnInit } from '@angular/core';
import {CustomerRepositoryService} from "../customer-repository.service";
import {FormGroup, FormBuilder, Validators, FormArray} from "@angular/forms";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styles: []
})
export class CustomerCreateComponent implements OnInit {

  customer;
  customerForm:FormGroup;
  subscription1;
  subscription2;
  subscription3;
  panelTitle = 'Create a customer';
  constructor(private _customerRepo: CustomerRepositoryService, private _fb: FormBuilder, private _router: Router, private _activeRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.customerForm = this.initCustomerForm();

    this.subscription2 = this._activeRoute.params.subscribe(
        data => {
          if (data['id']) {
            this.panelTitle = 'Edit Customer';

            this.subscription3 = this._customerRepo.getById(data['id']).subscribe(
                data2 => {
                  this.customer = data2;
                  this.customerForm = this.initCustomerForm();
                }
            )
          }
        }
    );
  }

  initCustomerForm(){
    let form = this._fb.group({
      'firstName': this._fb.control(this.customer?this.customer.firstName:'', Validators.required),
      'lastName': this._fb.control(this.customer?this.customer.lastName:'', Validators.required),
      'email': this._fb.control(this.customer?this.customer.email:'', Validators.required),
      'contactNumbers': this._fb.array([])
    });

    if (this.customer) {
      form.addControl('id', this._fb.control(this.customer._id));
      form.addControl('rev', this._fb.control(this.customer._rev));
    }
    if (this.customer && this.customer.contactNumbers && this.customer.contactNumbers.length) {
      for (let i = 0; i < this.customer.contactNumbers.length; i++) {
        this.addContactNumberFormGroup(form, this.customer.contactNumbers[i].number, this.customer.contactNumbers[i].type);
      }
    } else {
      this.addContactNumberFormGroup(form, '','');
    }

    return form;
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

  addContactNumberFormGroup(form:FormGroup, number, type){
    (<FormArray>form.get('contactNumbers')).push(
        this.createContactFormGroup(number, type)
    );
  }

  createContactFormGroup(number, type){
    return this._fb.group({
      'number': this._fb.control(number ? number : '', Validators.required),
      'type': this._fb.control(type ? type : '', Validators.required)
    });
  }

  removeContactNumber(n){
    let controls = <FormArray>this.customerForm.get('contactNumbers');
    controls.removeAt(n);
  }

  ngOnDestroy(){
    if (this.subscription1) {
      this.subscription1.unsubscribe();
    }
    if (this.subscription2) {
      this.subscription2.unsubscribe();
    }
    if (this.subscription3){
      this.subscription3.unsubscribe();
    }
  }
}
