import { Injectable } from '@angular/core';
import { User } from './user.module';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  apiURL = 'https://new-company-f2798-default-rtdb.firebaseio.com/users.json';

  constructor(private http: HttpClient) { }


  getPostData(sendUsers: User){

    return this.http.post<User>(this.apiURL, sendUsers)
    

  }

  getData(userId?){
    let loadUser = {}
    if(userId){
      loadUser['userId'] = userId;
    }
    return this.http.get(this.apiURL, {
      params: loadUser
    })
  }

  deteleUser(userId){
    return this.http.delete(`https://new-company-f2798-default-rtdb.firebaseio.com/users/${userId}.json`)

  }

  editUserMode(userId, userData: User){
    return this.http.put(`https://new-company-f2798-default-rtdb.firebaseio.com/users/${userId}.json`, userData)

  }


}
