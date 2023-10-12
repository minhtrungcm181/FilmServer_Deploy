import {PartialType} from '@nestjs/mapped-types';
import {CreateDemoUserDto} from './create-demo-user.dto';

export class UpdateDemoUserDto extends PartialType(CreateDemoUserDto) {}
