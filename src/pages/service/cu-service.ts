import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';


@Injectable()
export class CurrencyService {

    countryCodes = [];
    currencyMap = new Map();

    constructor(public http: HttpClient) {}

    getCountries() {
        return this.http.get("http://data.fixer.io/api/symbols?access_key=36c5ad864460b4395989f11d200fdc5c").toPromise();            
    }

    getExchangeRate(from: String, to: String){
        return this.http.get("http://free.currencyconverterapi.com/api/v5/convert?q=" + from + "_" + to + "&compact=y").toPromise();    
    }

}