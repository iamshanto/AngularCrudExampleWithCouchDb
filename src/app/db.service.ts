import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import {Http, Response, RequestMethod, Headers} from "@angular/http";
import 'rxjs/Rx';

@Injectable()
export class DbService {

  endpoint;
  constructor(private _http: Http) {
    this.endpoint = environment.dbHostName + environment.dbName + '/';
  }

  save(obj){
    if (!obj.id) {
      obj.id = this.guid();
    }
    return this._http.post(this.endpoint, obj);
  }

  getAll(){
    return this._http.get(this.endpoint + '_design/customers/_view/all')
        .map((response: Response) => response.json());
  }

  getById(id){
    return this._http.get(this.endpoint + id)
        .map((response: Response) => response.json());
  }

  deleteById(id, rev){
    let header = new Headers();
    //header.set('Content-Type', 'application/x-www-form-urlencodeds');
    return this._http.delete(this.endpoint + id + '?rev=' + rev, {
      method: RequestMethod.Delete
    }).map((response: Response) => response.json());
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