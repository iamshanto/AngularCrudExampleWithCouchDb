import { Injectable } from '@angular/core';
import {DbService} from "../db.service";

@Injectable()
export class CustomerRepositoryService {

  constructor(private _dataService:DbService) {}

  getAll(){
    return this._dataService.getAll();
  }

  getById(id){
    return this._dataService.getById(id);
  }

  deleteById(id, rev){
    return this._dataService.deleteById(id, rev);
  }

  save(obj){
    return this._dataService.save(obj);
  }

}
