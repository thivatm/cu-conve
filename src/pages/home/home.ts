import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CurrencyService } from "../service/cu-service";
import { WheelSelector } from '@ionic-native/wheel-selector';
import { HttpClient } from '@angular/common/http';
import { isNumber } from 'ionic-angular/umd/util/util';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  countryCodes = [];
  countryNames = [];
  resultRate: any;
  fromValue: any;
  toValue: any;
  fromCurr: any;
  toCurr: any;

  constructor(public navCtrl: NavController, protected cuService: CurrencyService, public http: HttpClient) {
    this.cuService.getCountries();
    
  }

  async getCurrencyRate() {
    let from = this.fromCurr;
    let to = this.toCurr;
    console.log('Curr: ' + from + '_' + to);
    try {
      const exchangeRate = await this.cuService.getExchangeRate(from, to);
      let rate = exchangeRate[from + "_" + to].val;
      this.resultRate = rate;
      console.log('CurrencyRate: ' + this.resultRate);
    }
    catch (err) {
      console.error(err);
    }
  }

  calculateCurrency() {
    this.getCurrencyRate();
    this.toValue = this.fromValue * parseInt(this.resultRate);
    console.log('Final Value: ' + this.toValue);
  }


}
