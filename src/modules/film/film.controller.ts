
import { FileRepository } from "@modules/file/file.repository";
import { FileService } from "@modules/file/file.service";
import { Body, Controller, Get, HttpStatus, Param, Post, Res, UploadedFiles, UseFilters, UseInterceptors } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AnyFilesInterceptor } from "@nestjs/platform-express";
import { FilmService } from "./film.service";
import { Film } from "@entities/film.entity";
import * as customid from "custom-id";
import { Response } from 'express';
import { UnvalidUpload } from "@common/unvalidupload.filter";

@Controller('film')
export class FilmController {
  host = this.configService.get<string>('HOST');
  constructor(
    private readonly fileService: FileService,
    private readonly configService: ConfigService,
    private readonly filmService: FilmService,
    private readonly fileRepository: FileRepository
  ) { }

  @Post('upload')
  @UseFilters(UnvalidUpload)
  @UseInterceptors(AnyFilesInterceptor())
  async handleFilm(@UploadedFiles() files, @Body() data) {
    const host = this.configService.get<string>('HOST');
    const newFilm = new Film();
    const medias = [];
    console.log("...uploading");
    for (const item of files) {
      if (item.mimetype == `video/mp4`) {
        const urlMp4 = `${host}/file/d/${item.key}`
        newFilm.movieUrl = urlMp4;
      }
      else if (item.mimetype == `image/jpeg`) {
        const urlJpeg = `${host}/file/d/${item.key}`
        newFilm.movieLogo = urlJpeg;
      }
      else return HttpStatus.UNSUPPORTED_MEDIA_TYPE;
      medias.push(await this.fileService.createFile(item))
    }
    newFilm.filmId = customid({});
    newFilm.movieCurrentEp = data.movieCurrentEp;
    newFilm.movieDescription = data.movieDescription;
    newFilm.movieM3U8 = data.movieM3U8;
    newFilm.movieRating = data.movieRating;
    newFilm.movieTitle = data.movieTitle;
    newFilm.movieTotalEp = data.movieTotalEp;
    newFilm.movieYear = data.movieYear;
    newFilm.genre = data.genre;
    const uploaded = await this.filmService.createFilm(newFilm);
    if (uploaded) { return HttpStatus.OK }
    else return HttpStatus.NOT_MODIFIED;
  }


  @Post('delete/:filmid')
  async deleteFilm(@Param('filmid') filmid: string) {
    console.log(filmid)
    const bucketName = this.configService.get<string>('S3_BUCKET');
    const film = await this.filmService.findOne(filmid);
    if (film) {
      let keyMp4 = await this.getFileKey(film.movieUrl);
      let keyJpeg = await this.getFileKey(film.movieLogo);
      console.log(keyJpeg);
      await this.fileService.deleteFileFromS3ByFileName(bucketName, keyMp4);
      await this.fileService.deleteFileFromS3ByFileName(bucketName, keyJpeg);
      this.fileRepository.deleteFile(keyMp4);
      this.fileRepository.deleteFile(keyJpeg);
      await this.filmService.deleteFilm(filmid);
      return HttpStatus.OK
    }
    return HttpStatus.EXPECTATION_FAILED;
  }


  @Post('edit/:filmid')
  async editFilmInfo(@Param('filmid') filmid: string, @Body() data): Promise<any> {
    const newFilm = new Film();
    newFilm.movieCurrentEp = data.movieCurrentEp;
    newFilm.movieDescription = data.movieDescription;
    newFilm.movieM3U8 = data.movieM3U8;
    newFilm.movieRating = data.movieRating;
    newFilm.movieTitle = data.movieTitle;
    newFilm.movieTotalEp = data.movieTotalEp;
    newFilm.movieYear = data.movieYear;
    newFilm.genre = data.genre;
    const process = await this.filmService.editFilm(filmid, newFilm);
  }

  @Get('list')
  async getAllFilmDB(): Promise<any> {
    const allFilmDB = await this.filmService.listAll()
    const resp = await allFilmDB.map((film) => {
      return {
        id: film.filmId,
        movieUrl: film.movieUrl,
        movieCurrentEp: film.movieCurrentEp,
        movieDescription: film.movieDescription,
        movieLogo: film.movieLogo,
        movieM3U8: film.movieM3U8,
        movieRating: film.movieRating,
        movieTitle: film.movieTitle,
        movieTotalEp: film.movieTotalEp,
        movieYear: film.movieYear,
        genre: film.genre
      }
    })
    return resp;
  }

  @Get('list/shared')
  async getAllFilm(@Res() resp: Response): Promise<any> {
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
            "icon": "",
            "videos":
              allFileDB.map((film) => {
                return {
                  MovieUrl: film.movieUrl,
                  MovieCurrentEp: film.movieCurrentEp,
                  MovieDescription: film.movieDescription,
                  MovieLogo: film.movieLogo,
                  MovieM3U8: film.movieM3U8,
                  MovieRating: film.movieRating,
                  MovieTitle: film.movieTitle,
                  MovieTotalEp: film.movieTotalEp,
                  MovieYear: film.movieYear,
                };
              })
          }
        ]

      }, {
        "channel_name": "Hành Động",
        "icon": "http://ubc.dauthutruyenhinh.com:2080/NPNMedia/icons/hot_youtube_icon.png",
        "sub_channels": [
          {
            "sub_channel_name": "Trang 1",
            "icon": "",
            "videos":
              allFileDB.map((film) => {
                return {
                  MovieUrl: film.movieUrl,
                  MovieCurrentEp: film.movieCurrentEp,
                  MovieDescription: film.movieDescription,
                  MovieLogo: film.movieLogo,
                  MovieM3U8: film.movieM3U8,
                  MovieRating: film.movieRating,
                  MovieTitle: film.movieTitle,
                  MovieTotalEp: film.movieTotalEp,
                  MovieYear: film.movieYear,
                };
              })

          }


        ]
      }, {
        "channel_name": "Viễn Tưởng",
        "icon": "http://ubc.dauthutruyenhinh.com:2080/NPNMedia/icons/hot_youtube_icon.png",
        "sub_channels": [
          {
            "sub_channel_name": "Trang 1",
            "icon": "",
            "videos":
              allFileDB.map((film) => {
                return {
                  MovieUrl: film.movieUrl,
                  MovieCurrentEp: film.movieCurrentEp,
                  MovieDescription: film.movieDescription,
                  movieLogo: film.movieLogo,
                  movieM3U8: film.movieM3U8,
                  movieRating: film.movieRating,
                  movieTitle: film.movieTitle,
                  movieTotalEp: film.movieTotalEp,
                  movieYear: film.movieYear,
                };
              })

          }


        ]
      }, {
        "channel_name": "Hình Sự",
        "icon": "http://ubc.dauthutruyenhinh.com:2080/NPNMedia/icons/hot_youtube_icon.png",
        "sub_channels": [
          {
            "sub_channel_name": "Trang 1",
            "icon": "",
            "videos":
              allFileDB.map((film) => {
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

          }


        ]
      }, {
        "channel_name": "Việt Nam",
        "icon": "http://ubc.dauthutruyenhinh.com:2080/NPNMedia/icons/hot_youtube_icon.png",
        "sub_channels": [
          {
            "sub_channel_name": "Trang 1",
            "icon": "",
            "videos":
              allFileDB.map((film) => {
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

          }


        ]
      }
    ]).send()

  }

  async getFileKey(url: string): Promise<string> {
    const getPoint = url.lastIndexOf('/');
    const subString = url.substring(getPoint + 1, url.length);
    return subString;
  }
}


