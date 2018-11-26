import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CurrencyService } from "../service/cu-service";
import { WheelSelector } from '@ionic-native/wheel-selector';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  countryCodes = [];
  countryNames = [];
  currencyRate:any;

  constructor(public navCtrl: NavController, protected cuService: CurrencyService, public wheelPicker: WheelSelector, public http: HttpClient) {
    this.calculateCurrency("LKR", "USD", "12");
    this.cuService.getCountries();
  }

  calculateCurrency(from: String, to:String, amount: String) {
    this.currencyRate = this.cuService.getExchangeRate(from, to);
    console.log("LKR_USD: " + this.cuService.exchangeRate);
  }
  fetchValues() {
    this.http.get("http://data.fixer.io/api/symbols?access_key=36c5ad864460b4395989f11d200fdc5c").subscribe(res => {
      for (var x in res["symbols"]) {
        this.countryNames = res["symbols"][x];
        this.countryCodes.push(x);
      }
    });
    console.log("From Server : " + this.cuService.countryCodes);
  }
}
