import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';


@Injectable()
export class CurrencyService {

    countryCodes = [];
    currencyMap = new Map();
    exchangeRate: any;

    constructor(public http: HttpClient) {}

    getCountries() {
        return this.http.get("http://data.fixer.io/api/symbols?access_key=36c5ad864460b4395989f11d200fdc5c")
            .subscribe((currencyData) => {
                for (let x in currencyData["symbols"]) {
                    this.countryCodes.push(x);
                    this.currencyMap.set('Description', x);
                }
            });
    }

    getExchangeRate(from: String, to: String){
        return this.http.get("http://free.currencyconverterapi.com/api/v5/convert?q=" + from + "_" + to + "&compact=y")
            .subscribe((rate) => {
                console.log("Rate: " + rate[from + "_" + to].val);
                this.exchangeRate = rate[from + "_" + to].val;
            });
        }

}