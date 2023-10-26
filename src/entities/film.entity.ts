import { IsNotEmpty } from "class-validator";
import { Column, Entity} from "typeorm";
import {BaseEntity} from '.';

@Entity()
export class Film extends BaseEntity{
    constructor(
    // movieCurrentEp: number,
    // movieDescription: string,
    // movieLogo: string,
    // movieM3U8: string,
    // movieRating: string,
    // movieTitle: string,
    // movieTotalEp: number,
    // movieYear: string,
    // movieUrl: string
    ) {
        super()
    // this.movieCurrentEp = movieCurrentEp;
    // this.movieDescription = movieDescription;
    // this.movieLogo = movieLogo;
    // this.movieM3U8 = movieM3U8;
    // this.movieRating = movieRating;
    // this.movieTitle = movieTitle;
    // this.movieTotalEp = movieTotalEp;
    // this.movieYear = movieYear;
    // this.movieUrl = movieUrl;
    }
    @Column()
    @IsNotEmpty()
    filmId: string;

    @Column()
    movieCurrentEp: number;
  
    @Column()
    movieDescription: string;
  
    @IsNotEmpty()
    @Column()
    movieLogo: string;
  
    @Column()
    movieM3U8: string;
  
    @Column()
    movieRating: string;
  
    @IsNotEmpty()
    @Column()
    movieTitle: string;
  
    @Column()
    movieTotalEp: number;
  
    @Column()
    movieYear: string;

    @Column()
    movieUrl: string;

    @Column()
    genre: string;

}
