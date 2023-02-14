import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUseDTO } from './dto/createUserDTO';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@Controller('api/v1/user')
export class UserController {
  constructor(private userService: UserService) {}

  @IsPublic()
  @Post()
  async createUser(@Body() user: CreateUseDTO) {
    return await this.userService.create(user);
  }
}
