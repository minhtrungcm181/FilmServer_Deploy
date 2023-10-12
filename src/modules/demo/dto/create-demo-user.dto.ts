import {IsNotEmpty} from 'class-validator';
import {CreateDemoPhotoDto} from './create-demo-photo.dto';

export class CreateDemoUserDto {
  @IsNotEmpty()
  code: string;

  @IsNotEmpty()
  name: string;

  phone: string;

  address: string;

  githubLink: string;

  photos: CreateDemoPhotoDto[];
}
