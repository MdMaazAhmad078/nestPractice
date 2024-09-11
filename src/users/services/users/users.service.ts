import { Injectable } from '@nestjs/common';
import { CreateUserType } from 'src/utils/types';

@Injectable()
export class UsersService {
  // handle bussiness logic
  private fakeUsers = [
    { id:1,username: 'maaz', email: 'maaz@gmail.com' },
    { id:2,username: 'mishal', email: 'mishal@gmail.com' },
  ];
  fetchUser() {
    return this.fakeUsers;
  }

  createUser(userDetails: CreateUserType){
    this.fakeUsers.push(userDetails);
    return {
      message:"User Created successfully",
      data: this.fakeUsers
    }
  }

 
  fetchUserById(id: number) {
    return this.fakeUsers.find((user) => user.id === id);
   
     ;
  }


}
