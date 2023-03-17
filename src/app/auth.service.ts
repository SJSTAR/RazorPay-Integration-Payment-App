import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }

  public init(): Promise<any> {
return new Promise((resolve, reject)=>{
  this.http.get('/assets/property-settings.json').subscribe((response:any)=>{
    environment.serviceUrl= response.serviceUrl;
    resolve(response)
  })
})
  }
}
