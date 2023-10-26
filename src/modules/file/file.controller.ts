import { IFileUpload } from '@common/fileupload.interface';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  StreamableFile,
  UploadedFile,
  UseFilters, UseInterceptors
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import 'multer';
import { FormDataRequest } from 'nestjs-form-data';
import { File } from '../../entities/file.entity';
import { FileRepository } from './file.repository';
import { FileService } from './file.service';
import { GetSharedFilesDto } from './dto/get-shared-files';
import { Public } from '@common/metadata';
import { UnauthorizeFilter } from '@common/unauthorize.filter';
@Controller('file')
export class FileController {
  constructor(
    private readonly fileService: FileService,
    private readonly configService: ConfigService,
    private readonly fileRepository: FileRepository,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async handleUploadFile(@UploadedFile() file: IFileUpload, @Body() data) {
    const newFile = new File(
      file.fieldname,
      file.originalname,
      file.encoding,
      file.mimetype,
      file.size,
      file.bucket,
      file.key,
      file.acl,
      file.contentType,
      file.storageClass,
      file.location,
      file.etag,
      // data.movieCurrentEp,
      // data.movieDescription,
      // data.movieLogo,
      // data.movieM3U8,
      // data.movieRating,
      // data.movieTitle,
      // data.movieTotalEp,
      // data.movieYear,
    );
    if (newFile) {
      // await this.fileRepository.createFileRecord(newFile);
      return await this.fileService.createFile(newFile);
    } else {
      return null;
    }
  }

  @Public()
  // @UseGuards(CookieGuard)
  @UseFilters(UnauthorizeFilter)
  @Get('/d/:path')
  async downloadFile(@Param('path') path: string, @Res({passthrough: true}) res: Response) {
    const bucketName = this.configService.get<string>('S3_BUCKET');
    const fileStream = await this.fileService.getFileFromS3ByFileName(bucketName, path);
    const fileInfo = await this.fileRepository.getFileByKey(path);
    const {originalname, mimetype} = fileInfo;

    res.set({
      'Content-Type': mimetype,
      'Content-Disposition': "attachment;filename*=UTF-8''" + encodeURI(originalname),
    });

    return new StreamableFile(fileStream);
  }

  @Post('/delete/:key')
  async deleteFile(@Param('key') key: string) {
    const deleteResult = await this.fileRepository.deleteFile(key);
    return deleteResult;
  }

  @Get('/find/:originalname')
  async findFile(@Param('originalname') originalname: string) {
    const findProcess = await this.fileRepository.findByName(originalname);
    return findProcess;
  }

  @Get('list')
  async getFile(): Promise<File[]> {
    const listAllProcess: File[] = await this.fileRepository.listAll();
    return listAllProcess;
  }

  @Get('count')
  async getCount(): Promise<number> {
    const countProcess: number = await this.fileRepository.countRecords();
    return countProcess;
  }

  @Post('/:key/rename')
  @FormDataRequest()
  async renameFile(@Param('key') key: string, @Body() data) {
    const fileExisted = await this.fileRepository.getFileByKey(key);
    if (fileExisted) {
      const fileName = fileExisted.originalname;
      const extension = await this.fileRepository.getFileExtension(fileName);
      const newName = `${data.newname}.${extension}`;
      const renameProcess = await this.fileRepository.rename(key, newName);
      if (renameProcess) return 'renamed';
    } else return 'file not existed';
  }

  @Get('list/shared')
  async listAllSharedLink(): Promise<GetSharedFilesDto[]> {
    const host = this.configService.get<string>('HOST');
    const links = `${host}/file/d`;

    const listOfSharedFiles = await this.fileRepository.listAllSharedFiles(links);
    return listOfSharedFiles;
  }
}
