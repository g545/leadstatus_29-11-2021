import { Component, OnInit } from '@angular/core';
import { LoginserviceService } from '../service/loginservice.service';
import { FormBuilder, FormGroup } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginform: FormGroup;

  constructor(private router: Router, private _service: LoginserviceService, public fb: FormBuilder, public http: HttpClient) {
    this.loginform = this.fb.group({
      email: [''],
      password: [''],
      token: ['']        
    });
    
    let checklogin = this._service.checklogin();
    if (checklogin==1) {
      this.router.navigate(['/dashboard']);
    }
  }

  ngOnInit(): void {
    
  }

  loginclick() {
    var formData: any = new FormData();
    formData.append("email", this.loginform.value.email);
    formData.append("password", this.loginform.value.password);
    formData.append("token", this.loginform.value.token);  
    this._service.methodpost('login', formData).subscribe((resp: any) => {
      if (resp.status == '1') {
        localStorage.setItem('auth_key', resp.data.auth_key);      
        this.router.navigate(['/dashboard']);
      }
      else {
        alert(resp.msg);
      }
    }, (err) => {
      console.log(err);
    });
  }
}
