import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CurrencyService } from "../service/cu-service";
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  countryCodes = [];
  countryNames = new Map();

  resultRate: any;
  swappedRate: any;

  fromValue: any;
  toValue: any;

  fromCurr: any = 'USD'; // default values
  toCurr: any = 'LKR'; // default values

  constructor(public navCtrl: NavController, protected cuService: CurrencyService, public http: HttpClient) {
  }

  ngOnInit() {
    this.fetchCountries();
    this.getCurrencyRate();
  }

  /* An asynchronous function which retrieves 
  CountryCode List
  */
  async fetchCountries() {
    try {
      const res = await this.cuService.getCountries();
      for (let x in res['results']) {
        this.countryCodes.push(x);
        this.countryNames.set(x, res['results'][x].currencyName);
      }
    } catch (err) {
      console.error(err);
    }
    console.log(this.countryNames);
  }

  async getCurrencyRate() {
    let from = this.fromCurr;
    let to = this.toCurr;
    try {
      const exchangeRate = await this.cuService.getExchangeRate(from, to);
      let rate = exchangeRate[from + "_" + to].val;
      this.resultRate = rate;
    }
    catch (err) {
      console.error(err);
    }
  }

  calculateCurrencyOne() {
    this.toValue = this.fromValue * parseFloat(this.resultRate);
    console.log('Final Value: ' + this.toValue);
  }

  calculateCurrencyTwo() {
    this.fromValue = this.toValue / parseFloat(this.resultRate);
    console.log('Final Value: ' + this.toValue);
  }
}
