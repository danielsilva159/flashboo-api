import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUseDTO } from './dto/createUserDTO';

@Controller('api/v1/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(@Body() user: CreateUseDTO) {
    return await this.userService.create(user);
  }
}
