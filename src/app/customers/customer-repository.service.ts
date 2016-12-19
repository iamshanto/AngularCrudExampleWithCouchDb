import {Injectable, EventEmitter} from '@angular/core';
import {DbService} from "../db.service";

@Injectable()
export class CustomerRepositoryService {

  getAllEvent = new EventEmitter<any>();
  getByIdEvent = new EventEmitter<any>();
  delelteEvent = new EventEmitter<any>();
  saveEvent = new EventEmitter<any>();

  constructor(private _dataService:DbService) {}

  getAll(){
    this._dataService.getAll()
        .then(data => this.getAllEvent.emit(data))
        .catch(err => console.log(err));
  }

  getById(id){
    this._dataService.getById(id)
        .then(data => this.getByIdEvent.emit(data))
        .catch(err => console.log(err));
  }

  deleteDoc(id){
    this._dataService.getById(id)
        .then(doc => {
          this._dataService.deleteDoc(doc)
              .then(data => this.delelteEvent.emit(data))
              .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
  }

  save(obj){
    this._dataService.save(obj)
        .then(data => this.saveEvent.emit(data))
        .catch(err => console.log(err));
  }

}