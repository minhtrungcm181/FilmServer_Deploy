import {IsNotEmpty} from 'class-validator';

export class GetSharedFilmsDto {
    
   @IsNotEmpty()
  movieUrl: string;

  movieCurrentEp: number;

  movieDescription: string;

    @IsNotEmpty()
  movieLogo: string;

  movieM3U8: string;

  movieRating: string;

  movieTitle: string;

  movieTotalEp: number;

  movieYear: string;
}
