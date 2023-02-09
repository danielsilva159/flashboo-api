import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entity/user.entity';

@Module({
  providers: [LoginService],
  controllers: [LoginController],
  imports: [TypeOrmModule.forFeature([UserEntity])],
  exports: [LoginService],
})
export class LoginModule {}
