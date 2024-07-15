import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})

export class CustomersService {
    constructor(
        private http: HttpClient,
    ) { }


  BaseURL = environment.baseUrlAPI;


  PostAllCustomersValues(data:any){

    return this.http.post(`${this.BaseURL}/Customers`,data);
  }

  GetAllCustomersValues(){
    return this.http.get(`${this.BaseURL}/Customers`);
  }

  UpdateCustomers(data:any){
    return this.http.put(`${this.BaseURL}/Customers/${data.id}`,data);
  }

  getSpecificCustomers(id:number){
    return this.http.get(`${this.BaseURL}/Customers/${id}`);
  }

  getSpecificCustomersHistory(id:number){
    return this.http.get(`${this.BaseURL}/Customers/${id}/history?days=30`);
  }

  DeleteCustomersValues(dataId:any){
     return this.http.delete(`${this.BaseURL}/Customers/${dataId}`);
  }

  GetEntityById(CustomersId:any): Observable<any> {
    return this.http.get(`${this.BaseURL}/Customersid/` + CustomersId);
  }

  SearchCustomers(data:any): Observable<any> {
    const temp:any = [];
    const objectKeyPair = Object.entries(data);
    objectKeyPair.forEach((element, index) => {
    if (element[1]) {
    temp.push(`${element[0]}=${element[1]}`);
    }
    });
    let jwt_token = sessionStorage.getItem('JwtToken');
    return this.http.get(`${this.BaseURL}` + `/Customers/get/search?jwt_token=${jwt_token}${temp.length > 0 ? `&${temp.join('&')}` : ''}`);
  }
}