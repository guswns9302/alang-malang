import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserLoginRes } from './dto/user.login.res';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // 로그인 (스플래시 화면에서 호출)
  @Post()
  createUser(@Body() createUserDto: CreateUserDto): Promise<UserLoginRes> {
    return this.usersService.createUser(createUserDto);
  }
}
