import {PartialType} from '@nestjs/mapped-types';
import {CreateDemoPhotoDto} from './create-demo-photo.dto';

export class UpdateDemoPhotoDto extends PartialType(CreateDemoPhotoDto) {}
