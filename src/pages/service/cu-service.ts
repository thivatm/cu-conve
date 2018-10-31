import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';


@Injectable()
export class CurrencyService {

    countryCodes: any[];
    countryNames: any[];
    constructor(public http: HttpClient) { }


    getCountries() {
        this.http.get("http://data.fixer.io/api/symbols?access_key=36c5ad864460b4395989f11d200fdc5c")
            .subscribe((currencyData) => {
                for (let x in currencyData["symbols"]){
                    this.countryNames = currencyData["symbols"][x];
                                        
                }
            });
    }

}