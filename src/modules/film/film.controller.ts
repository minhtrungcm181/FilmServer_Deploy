
import { IFileUpload } from "@common/fileupload.interface";
import { File } from "@entities/file.entity";
import { FileRepository } from "@modules/file/file.repository";
import { FileService } from "@modules/file/file.service";
import { Body, Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AnyFilesInterceptor, FileInterceptor } from "@nestjs/platform-express";
import { FilmService } from "./film.service";
import { Film } from "@entities/film.entity";
import { encodeStringPathToBase64 } from "@common/fileurl.strategy";

@Controller('film')
export class FilmController{
    host = this.configService.get<string>('HOST');
    constructor(
        private readonly fileService: FileService,
        private readonly configService: ConfigService,
        private readonly fileRepository: FileRepository,
        private readonly filmService: FilmService,
      ) {}
@Post('upload')
@UseInterceptors(AnyFilesInterceptor())
async handleFilm(@UploadedFile() file: {filemp4?: IFileUpload[], filejpg?: IFileUpload[] }, @Body() data) {
    const newFile1 = new File(
      file.filemp4.fieldname,
      file.filemp4.originalname,
      file.filemp4.encoding,
      file.filemp4.mimetype,
      file.filemp4.size,
      file.filemp4.bucket,
      file.filemp4.key,
      file.filemp4.acl,
      file.filemp4.contentType,
      file.filemp4.storageClass,
      file.filemp4.location,
      file.filemp4.etag, 
    )
    const newFile2 = new File(
        file.filejpg.fieldname,
        file.filejpg.originalname,
        file.filejpg.encoding,
        file.filejpg.mimetype,
        file.filejpg.size,
        file.filejpg.bucket,
        file.filejpg.key,
        file.filejpg.acl,
        file.filejpg.contentType,
        file.filejpg.storageClass,
        file.filejpg.location,
        file.filejpg.etag, 
      )
      const movieLogo = `${this.host}/${encodeStringPathToBase64(newFile2.id)}`
      const movieUrl = `${this.host}/${encodeStringPathToBase64(newFile1.id)}`
      if (newFile1 && newFile2) {
          // await this.fileRepository.createFileRecord(newFile);
          await this.fileService.createFile(newFile1);
          await this.fileService.createFile(newFile2);
          const newFilm = new Film(
            data.movieCurrentEp,
            data.movieDescription,
            movieLogo,
            data.movieM3U8,
            data.movieRating,
            data.movieTitle,
            data.movieTotalEp,
            data.movieYear,
            movieUrl
          )
          return await this.filmService.createFilm(newFilm)
        }
        else return null;

    
}
}
