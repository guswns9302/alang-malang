import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserLoginRes } from './dto/user.login.res';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserLoginRes> {
    let isUser: User = await this.userRepository.findOneBy({
      id: createUserDto.id,
    });

    if (isUser == null) {
      isUser = this.userRepository.create(createUserDto);
    }

    isUser.lastLoginAt = new Date();

    await this.userRepository.save(isUser);

    return {
      id: isUser.id,
      team: [],
      game: [],
    };
  }
}
