import {IsNotEmpty} from 'class-validator';
import {CreateDemoUserDto} from './create-demo-user.dto';

export class CreateDemoPhotoDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  url: string;

  user: CreateDemoUserDto;
}
