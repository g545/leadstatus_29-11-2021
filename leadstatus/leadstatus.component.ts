import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginserviceService } from '../service/loginservice.service';

@Component({
  selector: 'app-leadstatus',
  templateUrl: './leadstatus.component.html',
  styleUrls: ['./leadstatus.component.scss']
})
export class LeadstatusComponent implements OnInit {

  leadform:FormGroup;

  leadstatusObj:any=[];
  status=0;
  isedit=0;

  id:[''];

  constructor(public _service:LoginserviceService,public fb:FormBuilder) {
    this.leadstatusform();
  }

  ngOnInit(): void {
    this.leadstatus();
    
  }

  leadstatusform(){
    this.leadform = this.fb.group({
      color:[''],
      name:[''] ,
     
      
    });
  }

  leadstatus(){
    var formData: any = new FormData();
   formData.append("auth_key", localStorage.getItem('auth_key'));  
   this._service.methodpost('leadstatus', formData).subscribe((resp: any) => {
     if (resp.status == '1') {
       this.leadstatusObj=resp.data;
     }
     else {
       alert(resp.msg);
     }
   }, (err) => {
     console.log(err);
   });
 }

 saveleadstatus(){
    var formData: any = new FormData();
    formData.append("auth_key", localStorage.getItem('auth_key'));  
    formData.append("name", this.leadform.value.name); 
    formData.append("color",this.leadform.value.color);   
    this._service.methodpost('leadstatusadd', formData).subscribe((resp: any) => {
      if (resp.status == '1') {  
          this.leadstatus();
      }
      else {
        alert(resp.msg);
      }
    }, (err) => {
      console.log(err);
    });
  }

  deleteleadstatus(){
    var formData: any = new FormData();
    formData.append("auth_key", localStorage.getItem('auth_key'));  
    formData.append("id",this.leadform.value.id)
    this._service.methodpost('leadstatusdeleted', formData).subscribe((resp: any) => {
      if (resp.status == '1') {  
          this.leadstatus();
      }
      else {
        alert(resp.msg);
      }
    }, (err) => {
      console.log(err);
    });
  }
  addlead(){
    this.status=1;
  }
  backlead(){
    this.status=0;
  }

  
}
