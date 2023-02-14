import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserEntity } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUseDTO } from './dto/createUserDTO';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/models/AuthRequest';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(data: CreateUseDTO): Promise<Partial<User>> {
    data.password = await bcrypt.hash(data.password, 10);
    const user = await this.findUseEmail(data.email);
    if (user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: 'Esse e-mail ja existe na base de dados',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    await this.userRepository.save(this.userRepository.create(data));
    return {
      ...data,
      password: undefined,
    };
  }

  async findUseEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email: email } });
    return user;
  }
}
