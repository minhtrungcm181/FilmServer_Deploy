import { FileRepository } from "@modules/file/file.repository";
import { FilmService } from "./film.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { S3Service } from "@modules/s3/s3.service";
import { FileService } from "@modules/file/file.service";
import { FilmController } from "./film.controller";
import { Module } from "@nestjs/common";
import { NestjsFormDataModule } from "nestjs-form-data";
import { Film } from "@entities/film.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MulterModule } from "@nestjs/platform-express";
import { S3Module } from "@modules/s3/s3.module";
import * as multerS3 from 'multer-s3';
import {v4 as uuidv4} from 'uuid';
import { File } from "@entities/file.entity";
@Module({
    controllers: [FilmController],
    providers: [FileService, S3Service, ConfigService, FileRepository, FilmService],
    imports: [
      NestjsFormDataModule,
      TypeOrmModule.forFeature([File, Film]),
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
  export class FilmModule {}