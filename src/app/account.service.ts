import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  url = 'http://starlord.hackerearth.com/bankAccount';
  constructor(private http: HttpClient) { }

  getUserAccountDetails(){
    return this.http.get(this.url);
  }
}
