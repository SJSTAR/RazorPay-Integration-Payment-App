import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup
  showMessage:boolean=false

  constructor(private http:HttpClient,private router: Router,private toastr: ToastrService){}

  Username = ''
  ngOnInit(){
    this.loginForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', Validators.required)
    })
  }

  submitLogin(){
    console.log(this.loginForm.value.userName)
    if(this.loginForm.valid){
      this.Username = this.loginForm.value.userName
      let password =this.loginForm.value.password
      let link =environment.serviceUrl
      this.http.get(link + 'loginData.json').subscribe((response:any)=>{
        console.log(response);
        let data:any
        data=response

          if(data.email == this.Username && data.password == password)
          {
            sessionStorage.setItem('user',data)
            sessionStorage.setItem('isLoggedin','true')

            this.router.navigateByUrl('/dashboard');
          }else{
            this.showMessage=true
            sessionStorage.setItem('isLoggedin','false')
          }
      })

      this.loginForm.reset()
    }else{
      this.showMessage=true
    }
  }
}
