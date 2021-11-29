import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginserviceService } from '../service/loginservice.service';

@Component({
  selector: 'app-newnumber',
  templateUrl: './newnumber.component.html',
  styleUrls: ['./newnumber.component.scss']
})
export class NewnumberComponent implements OnInit {
  newcallinglistobj:any=['']
  
  called_status=0;

  constructor(public service:LoginserviceService,public router:Router) { }

  ngOnInit(): void {
   
    this.newcalllist()
  }
  newcalllist(){
    var formData: any = new FormData();
   formData.append("auth_key", localStorage.getItem('auth_key'));  
   this.service.methodpost('newcallinglist', formData).subscribe((resp: any) => {
     if (resp.status == '1') {
       this.newcallinglistobj=resp.data;      
     }
     else {
       alert(resp.msg);
     }
   }, (err) => {
     console.log(err);
   });
 }
 message(mobile:any){
   localStorage.setItem('mobile',mobile);
   this.router.navigate(['./chat']);
 }

}
