import { Body, Controller, Post } from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateUseDTO } from './dto/createUserDTO';

@Controller('api/v1/login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  async createUser(@Body() user: CreateUseDTO) {
    return await this.loginService.create(user);
  }
}
