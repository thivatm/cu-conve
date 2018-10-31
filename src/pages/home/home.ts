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

  currencyCodes = [];
  currencyCodesCopy: any[];

  constructor(public navCtrl: NavController, protected cuService: CurrencyService, public wheelPicker: WheelSelector, public http: HttpClient) {
    this.fetchValues();
  }

  openCurrencyPicker() {
      this.wheelPicker.show({
        title: 'Currency Codes',
        items: [
          this.currencyCodes
        ]
      }).then(
        result => {
          console.log('Success: ', result);
        },
        err => console.log('Error: ', err)
      );
  }

  fetchValues() {
    this.http.get("http://data.fixer.io/api/symbols?access_key=36c5ad864460b4395989f11d200fdc5c").subscribe(res => {
      this.currencyCodesCopy = res['symbols'];
      for (var x in this.currencyCodesCopy){
        this.currencyCodes.push(x);
        //console.log(x + " " + this.currencyCodesCopy[x]);        
      } 
    });
    console.log("Success: " + this.currencyCodes);
  }
}
