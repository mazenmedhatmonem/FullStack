import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  

  constructor(private fb:FormBuilder , private http:HttpClient) { }

  readonly BaseURI = 'https://localhost:44342/api';
  


formModel = this.fb.group({
  UserName:['',Validators.required],
  Email:['',Validators.email],
  fullname:[''],
  passwords: this.fb.group({
    password:['', [Validators.required, Validators.minLength(4)]],
    confirmPassword:['',Validators.required]
  },{validator: this.comparePasswords})


});

comparePasswords(fb:FormGroup)
{
  let confirmPasswordCtrl = fb.get("confirmPassword");
//passwordmismatch
if(confirmPasswordCtrl.errors==null || "passwordmismatch" in confirmPasswordCtrl.errors )
{
  if(fb.get("password").value!=confirmPasswordCtrl.value)
  {
    confirmPasswordCtrl.setErrors({passwordmismatch:true});
  }
  else
  {
    confirmPasswordCtrl.setErrors({passwordmismatch:false});
  }
}
}

register()
{
var body = 
{
  username: this.formModel.value.UserName,
  email : this.formModel.value.Email,
  password : this.formModel.value.passwords.password,
  fullname : this.formModel.value.fullname

};
return this.http.post(this.BaseURI + "/applicationuser/register",body)
}

login(formData) {
  return this.http.post(this.BaseURI + '/ApplicationUser/Login', formData);
}

getUserProfile() {
  return this.http.get(this.BaseURI + '/UserProfile');
}

roleMatch(allowedRoles): boolean {
  var isMatch = false;
  var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
  var userRole = payLoad.role;
  allowedRoles.forEach(element => {
    if (userRole == element) {
      isMatch = true;
      return false;
    }
  });
  return isMatch;
}

}
