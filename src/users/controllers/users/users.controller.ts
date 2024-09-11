import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users') // route is /users
export class UsersController {

  constructor(private userService:UsersService){

  }


  // with service

  @Get()
  getUsers(){
    return this.userService.fetchUser();
  }
  // @Get() // @Get is a decorator and getUsers is a method
  // getUsers() {
  //   return [
  //     {
  //       username: 'Maaz',
  //       email: 'maaz@gmail.com',
  //     },
  //   ];
  // }

  @Get('posts') // decorator of route "/users/posts"
  getUserPosts() {
    return [
      {
        username: 'Maaz',
        email: 'maaz@gmail.com',
        posts: [
          {
            id: 'uhdqud78678qw',
            title: 'Post1',
          },
          {
            id: 'u7867dqdq',
            title: 'Post2',
          },
        ],
      },
    ];
  }

  @Get('posts/comments')
  getUserPostsComments() {
    return [
      {
        id: 1,
        title: 'posts 1',
        comments: ['nice one', 'hello'],
      },
    ];
  }

  // useing express nnot recommmanded
  // @Post('create') // route /users/create
  // createUser(@Req() request: Request, @Res() response: Response) { // import Request and Response only form express
  //   console.log(request.body);
  //   response.send("Created");

  // }

  @Post()
  @UsePipes(new ValidationPipe())
  createUser2(@Body() userData: CreateUserDto) {
    console.log(userData);
    return this.userService.createUser(userData);
  }
  @Get('id/:id')
  getUserbyId(@Param('id', ParseIntPipe) id: number) {
    // use ParseIntPipe to convert to integer and we can only send integer
    const user = this.userService.fetchUserById(id);
    if(!user){
      throw new HttpException('User not found',HttpStatus.BAD_REQUEST)
    }
      
    return user;
  }
  @Get('id/:id/:postId')
  getUserbyIdandPostId(
    @Param('id') id: string,
    @Param('postId') postId: string,
  ) {
    console.log(id, postId);
    return {
      id,
      postId,
    };
  }
  @Get('filter')
  getUserFilterId(@Query('sortby') sortby: string) {
    console.log(sortby);
    return [
      {
        username: 'Maaz',
        email: 'maaz@gmail.com',
      },
    ];
  }

  @Get('filterBoolean')
  getUserBooleanId(@Query('sortDes', ParseBoolPipe) sortDes: boolean) {
    console.log(sortDes);
    return [
      {
        username: 'Maaz',
        email: 'maaz@gmail.com',
      },
    ];
  }
}
