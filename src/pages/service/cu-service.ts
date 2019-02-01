import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';


@Injectable()
export class CurrencyService {

    constructor(public http: HttpClient) {}

    getCountries() {
        return this.http.get("https://free.currencyconverterapi.com/api/v6/currencies").toPromise();            
    }

    getExchangeRate(from: String, to: String){
        return this.http.get(`http://free.currencyconverterapi.com/api/v5/convert?q=${from}_${to}&compact=y`).toPromise();    
    }

}