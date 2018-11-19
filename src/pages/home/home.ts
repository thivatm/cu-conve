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

  constructor(public navCtrl: NavController, protected cuService: CurrencyService, public wheelPicker: WheelSelector, public http: HttpClient) {
    this.cuService.getCountries();
    this.fetchValues();
  }

  calculateCurrency(from: String, to:String, amount: String) {


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
