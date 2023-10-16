import {IsNotEmpty} from 'class-validator';

export class GetSharedFilesDto {
  @IsNotEmpty()
  url: string;

  // movieCurrentEp: number;

  // movieDescription: string;

  // movieLogo: string;

  // movieM3U8: string;

  // movieRating: string;

  // movieTitle: string;

  // movieTotalEp: number;

  // movieYear: string;
}
