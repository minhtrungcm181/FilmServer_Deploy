import {CasdoorService} from '@modules/casdoor/casdoor.service';
import {S3Module} from '@modules/s3/s3.module';
import {S3Service} from '@modules/s3/s3.service';
import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {MulterModule} from '@nestjs/platform-express';
import {TypeOrmModule} from '@nestjs/typeorm';
import * as multerS3 from 'multer-s3';
import {v4 as uuidv4} from 'uuid';
import {CookieGuard} from './cookie.guard';
import {File} from './entities/file.entity';
import {FileController} from './file.controller';
import {FileRepository} from './file.repository';
import {FileService} from './file.service';
import {NestjsFormDataModule} from 'nestjs-form-data';

@Module({
  controllers: [FileController],
  providers: [FileService, S3Service, ConfigService, FileRepository, CasdoorService, CookieGuard],
  imports: [
    NestjsFormDataModule,
    TypeOrmModule.forFeature([File]),
    MulterModule.registerAsync({
      imports: [ConfigModule, S3Module],
      useFactory: async (configService: ConfigService, s3service: S3Service) => ({
        storage: multerS3({
          s3: s3service.client,
          bucket: configService.get<string>('S3_BUCKET'),
          acl: 'public-read',
          contentType: multerS3.AUTO_CONTENT_TYPE,
          key: (_req, _file, callback) => {
            const filename = `${uuidv4()}`;
            callback(null, filename);
          },
        }),
      }),
      inject: [ConfigService, S3Service],
    }),
  ],
})
export class FileModule {}
