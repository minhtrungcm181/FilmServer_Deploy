import { Film } from "@entities/film.entity";
import { S3Service } from "@modules/s3/s3.service";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

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
}