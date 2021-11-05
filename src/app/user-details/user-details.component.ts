import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../users/users.service';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  loadUserId: any;

  constructor(private activatedRoute: ActivatedRoute, private userService: UsersService) { }

  ngOnInit() {

    this.activatedRoute.paramMap.subscribe(
      params => {
        this.loadUserId = params.get('userId');
        this.loadUqnickUser(this.loadUserId)
       

      }
    )
    
  

  }


  loadUserArry: any = []

  loadUqnickUser(loadUserId){
    this.userService.getData(loadUserId)
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
      Response => {
        this.loadUserArry = Response[0]
        console.log(Response)
      }
    )

  }



}
