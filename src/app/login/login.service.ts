import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUseDTO } from './dto/createUserDTO';
import * as bcrypt from 'bcrypt';
import { NotFoundException } from '@nestjs/common/exceptions';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(data: CreateUseDTO) {
    const saltOrRounds = 10;
    data.password = await bcrypt.hash(data.password, saltOrRounds);
    const user = await this.findUseEmail(data.email);
    if (user) {
      return 'Esse e-mail ja existe';
    }
    return await this.userRepository.save(this.userRepository.create(data));
  }

  async findUseEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email: email } });
    console.log(user);

    return user;
  }
}
