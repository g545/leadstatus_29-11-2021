import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginserviceService } from '../service/loginservice.service';

@Component({
  selector: 'app-new-lead',
  templateUrl: './new-lead.component.html',
  styleUrls: ['./new-lead.component.scss']
})
export class NewLeadComponent implements OnInit {
 customeraddobj:any=[];
 name:any=0;

  constructor( public _service:LoginserviceService,public router:Router) { }

  ngOnInit(): void {
  }
  ngsubmit(){
    this.router.navigate(['/group']);
  }
  customeradd(){ 
    var formData: any = new FormData();
    formData.append("auth_key", localStorage.getItem('auth_key'));  
    this._service.methodpost('/customeradd', formData).subscribe((resp: any) => {
      if (resp.status == '1') {
        this.customeraddobj=resp.data;    
      }
      else {
        alert(resp.msg);
      }
    }, (err) => {
      console.log(err);
    });
  }
}
