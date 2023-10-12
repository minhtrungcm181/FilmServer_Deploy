export interface IFileUpload extends Express.Multer.File {
  bucket: string;
  key: string;
  acl: string;
  contentType: string;
  storageClass: string;
  location: string;
  etag: string;
  movieCurrentEp: number;
  movieDescription: string;
  movieLogo: string;
  movieM3U8: string;
  movieRating: string;
  movieTitle: string;
  movieTotalEp: number;
  movieYear: string;
}
