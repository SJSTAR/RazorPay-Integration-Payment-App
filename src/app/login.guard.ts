import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate, CanLoad {
 constructor(private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(sessionStorage.getItem('isLoggedin') == 'true'){
        console.log("hello1");

      return true;
      }
      else{
        console.log("hello2");
        this.router.navigate(['signin'])
        return false;
      }
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(sessionStorage.getItem('isLoggedin') == 'true'){
        console.log("hello");

        return true;
        }
        else{
          console.log("hello4");
          return false;
        }
  }
}
