import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

//const APIKEY = '36c5ad864460b4395989f11d200fdc5c';

@Injectable()
export class CurrencyService {

    countryCodes: any[];
    constructor(public http: Http) { }


    getCountries() {
        this.http.get("http://data.fixer.io/api/symbols?access_key=36c5ad864460b4395989f11d200fdc5c")
            .map(res => res.json()).subscribe((currencyData) => {
                this.countryCodes = currencyData.symbols;
            });
        return this.countryCodes;
    }

    // getCurrencyValue(from: string, to: string, amount: string) {
    //     this.http.get("http://data.fixer.io/api/convert?access_key=${APIKEY}&from=${from}&to=${to}&amount=${amount}")
    //         .map(res => res.json()).subscribe((data) => {

    //         });
    // }

}