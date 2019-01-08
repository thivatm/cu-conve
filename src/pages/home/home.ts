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
  swappedRate: any;

  fromValue: any;
  toValue: any;
  
  fromCurr: any = 'USD'; // default values
  toCurr: any = 'LKR'; // default values

  constructor(public navCtrl: NavController, protected cuService: CurrencyService, public http: HttpClient) {
    this.fetchCountries();
  }

  /* An asynchronous function which retrieves 
  CountryCode List
  */
  async fetchCountries() {
    try {
      const response = await this.cuService.getCountries();
      for (let x in response['symbols']) {
        this.countryCodes.push(x);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async getCurrencyRate() {
    let from = this.fromCurr;
    let to = this.toCurr;
    try {
      const exchangeRate = await this.cuService.getExchangeRate(from, to);
      const swapExchangeRate = await this.cuService.getExchangeRate(to, from);
      let rate = exchangeRate[from + "_" + to].val;
      let swappedRate = swapExchangeRate[to + "_" + from].val;
      this.resultRate = rate;
      this.swappedRate = swappedRate;
    }
    catch (err) {
      console.error(err);
    }
    console.log("get exchange executued")
  }

  calculateCurrencyOne() {
    this.toValue = this.fromValue * parseFloat(this.resultRate);
    console.log('Final Value: ' + this.toValue);
  }

  calculateCurrencyTwo() {
    this.fromValue = this.toValue * parseFloat(this.swappedRate);
    console.log('Final Value: ' + this.toValue);
  }
}
