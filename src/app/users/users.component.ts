import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from './user.module';
import { UsersService } from './users.service';
import { map } from 'rxjs/operators';

declare var $ :any;


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private httpService: UsersService) { }

  editUserMode: boolean = false;

  aleartBox:boolean = false;
  userUpdateMessage: boolean = false;

  userArrayEmt: any = [];
  UqnUserId: any;

  editUserId: any

  ngOnInit() {
    
    this.loadUser()
  }


 
  userForm = new FormGroup({

    profile: new FormControl('', [(
      Validators.required
    
      )] ),
    skill: new FormControl('', [(
      Validators.required
    )]),
    company: new FormControl('', [(
      Validators.required
    )]),
  
    description: new FormControl('', [(
      Validators.required
    )]),

 });

 get profile(){
  return this.userForm.get('profile');
 }
 get skill(){
  return this.userForm.get('skill');
 }
 get company(){
  return this.userForm.get('company');
 }
 get description(){
  return this.userForm.get('description');
 }

  loadUser(){
    this.httpService.getData()
    .pipe(map( datachange => {
      const newuserArray = []
      for(const key in datachange){
        if(datachange.hasOwnProperty(key)){
          newuserArray.splice(0, 0, {userId: key, ...datachange[key]})
        }   
      }
      return newuserArray;

    }

    ))
    .subscribe(
      (Response) => {
        this.userArrayEmt = Response
        // console.log(Response)
      }
    )
  }


  userOnSubmit(users: User){
    if(this.editUserMode){
      this.httpService.editUserMode(this.editUserId, users).subscribe(
        (Response) => {
        this.loadUser()
        }
      )
      this.userUpdateMessage = true;
      this.editUserMode = false;
      this.userForm.reset();
      setTimeout(function()
      {
        $('#exampleModal').modal('hide');
        $(".alert-success").hide();
      }, 3000);
    }
    else{
      this.httpService.getPostData(users).subscribe(
        (Response) => {
          
          this.loadUser()
        }
      )
      this.userForm.reset();
      this.aleartBox = true;
  
      setTimeout(function()
      {
        $('#exampleModal').modal('hide');
        $(".alert-success").hide();
      }, 3000);

    }
    

  }
  

  removeUser(userId){
    if(confirm('Do you want delete this user?')){
      this.httpService.deteleUser(userId).subscribe((DeleteUers) => {
        this.loadUser()
      })

    }
  

  }

  editUser(userId, index){

    this.editUserId = userId;

    this.editUserMode = true;
    this.aleartBox = false;
 
      $('#exampleModal').modal('show');

      this.userForm.setValue({
        profile: this.userArrayEmt[index].profile,
      skill: this.userArrayEmt[index].skill,
      company: this.userArrayEmt[index].company,
      description: this.userArrayEmt[index].description
          
      })


  }

  resetForm(){
    this.editUserMode = false;
    this.userForm.reset()
  }

  

}
