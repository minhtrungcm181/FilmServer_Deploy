import {Logger, Module} from '@nestjs/common';
import {DemoUserService} from './demo-user.service';
import {DemoUserController} from './demo-user.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {DemoPhoto} from './entities/demo-photo.entity';
import {DemoUser} from './entities/demo-user.entity';
import {DemoPhotoController} from './demo-photo.controller';
import {DemoPhotoService} from './demo-photo.service';

@Module({
  imports: [TypeOrmModule.forFeature([DemoUser, DemoPhoto])],
  controllers: [DemoUserController, DemoPhotoController],
  providers: [Logger, DemoUserService, DemoPhotoService],
})
export class DemoModule {}
