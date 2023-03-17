import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';



import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgxGaugeModule } from 'ngx-gauge';
import { ToastrModule } from 'ngx-toastr';
import { AuthService } from './auth.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
export function init_app(initService:AuthService){
  return()=>initService.init();
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatCardModule,
    HttpClientModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    NgxGaugeModule,
    ToastrModule.forRoot()
  ],
  providers: [
    AuthService,
    {
      provide:APP_INITIALIZER,
      useFactory:init_app,
      deps:[AuthService],
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
