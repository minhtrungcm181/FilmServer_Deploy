
import { IFileUpload } from "@common/fileupload.interface";
import { File } from "@entities/file.entity";
import { FileRepository } from "@modules/file/file.repository";
import { FileService } from "@modules/file/file.service";
import { Body, Controller, Post, UploadedFile, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AnyFilesInterceptor, FileInterceptor } from "@nestjs/platform-express";
import { FilmService } from "./film.service";
import { Film } from "@entities/film.entity";
import { encodeStringPathToBase64 } from "@common/fileurl.strategy";
import { stringify } from "querystring";

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
async handleFilm(@UploadedFiles() files, @Body() data) {
  const newFilm = new Film();
  const medias = [];
  
  for(const item of files){
    console.log
    if(item.mimetype == `video/mp4`) {
      console.log(1);
      console.log(item.key)
      const urlMp4 = `http://localhost:5000/file/d/${item.key}`
      newFilm.movieUrl = urlMp4;
      console.log(urlMp4);
    } 
    else if (item.mimetype == `image/jpeg`) {
      console.log(2)
      console.log(item.key)
      // const urlJpg = `http://localhost:5000/${encodeStringPathToBase64()}`
      // newFilm.movieLogo = urlJpg;
      // console.log(urlJpg);
    }
    medias.push(await this.fileService.createFile(item))
  }
  
  
}
}
