
import { IFileUpload } from "@common/fileupload.interface";
import { File } from "@entities/file.entity";
import { FileRepository } from "@modules/file/file.repository";
import { FileService } from "@modules/file/file.service";
import { Body, Controller, Get, HttpStatus, Post, Res, UploadedFile, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AnyFilesInterceptor, FileInterceptor } from "@nestjs/platform-express";
import { FilmService } from "./film.service";
import { Film } from "@entities/film.entity";
import { encodeStringPathToBase64 } from "@common/fileurl.strategy";
import { stringify } from "querystring";
import { GetSharedFilmsDto } from "@modules/file/dto/get-shared-films";
import { Repository } from "typeorm";
import {Response} from 'express';
import { Http } from "winston/lib/winston/transports";

@Controller('film')
export class FilmController{
    host = this.configService.get<string>('HOST');
    constructor(
        private readonly fileService: FileService,
        private readonly configService: ConfigService,
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
      const urlMp4 = `http://localhost:5000/file/d/${item.key}`
      newFilm.movieUrl = urlMp4;
    } 
    else if (item.mimetype == `image/jpeg`) {
      const urlJpeg = `http://localhost:5000/file/d/${item.key}`
      newFilm.movieLogo = urlJpeg;
    }
    medias.push(await this.fileService.createFile(item))
  }
  newFilm.movieCurrentEp = data.movieCurrentEp;
  newFilm.movieDescription = data.movieDescription;
  newFilm.movieM3U8 = data.movieM3U8;
  newFilm.movieRating = data.movieRating;
  newFilm.movieTitle = data.movieTitle;
  newFilm.movieTotalEp = data.movieTotalEp;
  newFilm.movieYear = data.movieYear;
  return await this.filmService.createFilm(newFilm);
  
}
@Get('list/shared')
async getAllFilm (@Res() resp: Response):Promise<any>{
  const allFileDB = await this.filmService.listAll()
//   await allFileDB.map((film)=> {
//   return {
//     movieUrl: film.movieUrl,
//     movieCurrentEp: film.movieCurrentEp,
//     movieDescription: film.movieDescription,
//     movieLogo: film.movieLogo,
//     movieM3U8: film.movieM3U8,
//     movieRating: film.movieRating,
//     movieTitle: film.movieTitle,
//     movieTotalEp: film.movieTotalEp,
//     movieYear: film.movieYear,
//   };
// })
// return respDTO;
  resp.status(HttpStatus.OK).json([
    {
      "channel_name": "Tuyển Chọn",
      "icon": "http://ubc.dauthutruyenhinh.com:2080/NPNMedia/icons/hot_youtube_icon.png",
      "sub_channels": [
        {
         "sub_channel_name": "Trang 1",
         "icon":"",
         "video" : [
           allFileDB.map((film)=> {
            return {
              movieUrl: film.movieUrl,
              movieCurrentEp: film.movieCurrentEp,
              movieDescription: film.movieDescription,
              movieLogo: film.movieLogo,
              movieM3U8: film.movieM3U8,
              movieRating: film.movieRating,
              movieTitle: film.movieTitle,
              movieTotalEp: film.movieTotalEp,
              movieYear: film.movieYear,
            };
          })
         ]
      }


      ]

    },{
      "channel_name": "Hành Động",
      "icon": "http://ubc.dauthutruyenhinh.com:2080/NPNMedia/icons/hot_youtube_icon.png",
      "sub_channels": [
        {
         "sub_channel_name": "Trang 1",
         "icon":"",
         "video" : [
          allFileDB.map((film)=> {
            return {
              movieUrl: film.movieUrl,
              movieCurrentEp: film.movieCurrentEp,
              movieDescription: film.movieDescription,
              movieLogo: film.movieLogo,
              movieM3U8: film.movieM3U8,
              movieRating: film.movieRating,
              movieTitle: film.movieTitle,
              movieTotalEp: film.movieTotalEp,
              movieYear: film.movieYear,
            };
          })
         ]
      }


      ]
    },{"channel_name": "Viễn Tưởng",
    "icon": "http://ubc.dauthutruyenhinh.com:2080/NPNMedia/icons/hot_youtube_icon.png",
    "sub_channels": [
      {
       "sub_channel_name": "Trang 1",
       "icon":"",
       "video" : [
        allFileDB.map((film)=> {
          return {
            movieUrl: film.movieUrl,
            movieCurrentEp: film.movieCurrentEp,
            movieDescription: film.movieDescription,
            movieLogo: film.movieLogo,
            movieM3U8: film.movieM3U8,
            movieRating: film.movieRating,
            movieTitle: film.movieTitle,
            movieTotalEp: film.movieTotalEp,
            movieYear: film.movieYear,
          };
        })
       ]
    }


    ]},{"channel_name": "Hình Sự",
    "icon": "http://ubc.dauthutruyenhinh.com:2080/NPNMedia/icons/hot_youtube_icon.png",
    "sub_channels": [
      {
       "sub_channel_name": "Trang 1",
       "icon":"",
       "video" : [
        allFileDB.map((film)=> {
          return {
            movieUrl: film.movieUrl,
            movieCurrentEp: film.movieCurrentEp,
            movieDescription: film.movieDescription,
            movieLogo: film.movieLogo,
            movieM3U8: film.movieM3U8,
            movieRating: film.movieRating,
            movieTitle: film.movieTitle,
            movieTotalEp: film.movieTotalEp,
            movieYear: film.movieYear,
          };
        })
       ]
    }


    ]},{"channel_name": "Việt Nam",
    "icon": "http://ubc.dauthutruyenhinh.com:2080/NPNMedia/icons/hot_youtube_icon.png",
    "sub_channels": [
      {
       "sub_channel_name": "Trang 1",
       "icon":"",
       "video" : [
        allFileDB.map((film)=> {
          return {
            movieUrl: film.movieUrl,
            movieCurrentEp: film.movieCurrentEp,
            movieDescription: film.movieDescription,
            movieLogo: film.movieLogo,
            movieM3U8: film.movieM3U8,
            movieRating: film.movieRating,
            movieTitle: film.movieTitle,
            movieTotalEp: film.movieTotalEp,
            movieYear: film.movieYear,
          };
        })
       ]
    }


    ]}
  ]).send()
    
}

}


