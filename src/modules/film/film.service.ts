import { Film } from "@entities/film.entity";
import { S3Service } from "@modules/s3/s3.service";
import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions, Repository } from "typeorm";

@Injectable()
export class FilmService{
    constructor(
        @InjectRepository(Film)
        private readonly filmRepository: Repository<Film>,
        private readonly s3service: S3Service,
    ) {}
    async createFilm(newFilm: Film) {
        return await this.filmRepository.save(newFilm);
    }
    async listAll(): Promise<Film[]> {
        const listProcess = await this.filmRepository.find();
        return listProcess;
      }
    async findOne(filmId: string): Promise<Film>{
        const option: FindOneOptions<Film> = {where: {filmId: filmId}};
        const filmFound = await this.filmRepository.findOne(option);
        return filmFound;
    }
    async deleteFilm(filmId: string): Promise<any> {
        const filmFound = await this.filmRepository.delete({filmId})
    }
    async editFilm(filmId: string, newData: Film): Promise<any>{
        const process = await this.filmRepository.update({filmId: filmId}, newData);
        if(!process) return HttpStatus.BAD_REQUEST;
    }
}