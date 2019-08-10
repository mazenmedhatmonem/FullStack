import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styles: []
})
export class RegistrationComponent implements OnInit {

  constructor(public service:UserService , private toastr: ToastrService) { }

  ngOnInit() {
    this.service.formModel.reset();
  }

  onsubmit()
  {
    this.service.register().subscribe(
      (res:any)=>{
        if(res.succeeded){
          this.service.formModel.reset();
          this.toastr.success("new user is created", "registration successfull")
        }
        else{
          res.errors.forEach(element=>{
            switch(element.code)
            {
              case"DuplicateUserName":
              this.toastr.error("user name already taken" , "registration failed")
              //user name already taken
              break;

              default :
              this.toastr.error(element.description,"registration failed")

              //registration failed

              break;
            }
            {

            }
          })
        }
      },
      err=>{
        console.log(err);
      }
    )
  }

}
