import { IsNotEmpty } from 'class-validator';

export class CreateUseDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
