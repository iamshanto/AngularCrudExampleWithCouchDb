import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import {Http, Response, RequestMethod, Headers} from "@angular/http";
import 'rxjs/Rx';

@Injectable()
export class DbService {

  endpoint;
  db;

  constructor(private _http: Http) {
    this.db = new PouchDB('customers');

    this.endpoint = environment.dbHostName + environment.dbName + '/';
  }

  save(obj){

    if (!obj.id) {
      obj._id = this.guid();
    }

    return this.db.put(obj);
  }

  getAll(){
    return this.db.allDocs({
      include_docs: true,
      attachments: true
    });
  }

  getById(id){
    return this.db.get(id);
  }

  deleteDoc(doc){
    return this.db.remove(doc);
  }

  guid() {
    return [this.s4(),this.s4(),this.s4(),this.s4(),this.s4(),this.s4(),this.s4(),this.s4()].join("");
  }

  s4(){
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
  }

}