import {BaseEntity} from '.';
import {IsNotEmpty, IsNumber} from 'class-validator';
import {Column, Entity} from 'typeorm';

@Entity()
export class File extends BaseEntity {
  constructor(
    fieldname: string,
    originalname: string,
    encoding: string,
    mimetype: string,
    size: number,
    bucket: string,
    key: string,
    acl: string,
    contentType: string,
    storageClass: string,
    location: string,
    etag: string,
    // movieCurrentEp: number,
    // movieDescription: string,
    // movieLogo: string,
    // movieM3U8: string,
    // movieRating: string,
    // movieTitle: string,
    // movieTotalEp: number,
    // movieYear: string,
  ) {
    super();
    this.fieldname = fieldname;
    this.originalname = originalname;
    this.encoding = encoding;
    this.mimetype = mimetype;
    this.size = size;
    this.bucket = bucket;
    this.key = key;
    this.acl = acl;
    this.contentType = contentType;
    this.storageClass = storageClass;
    this.location = location;
    this.etag = etag;
    // this.movieCurrentEp = movieCurrentEp;
    // this.movieDescription = movieDescription;
    // this.movieLogo = movieLogo;
    // this.movieM3U8 = movieM3U8;
    // this.movieRating = movieRating;
    // this.movieTitle = movieTitle;
    // this.movieTotalEp = movieTotalEp;
    // this.movieYear = movieYear;
  }

  @IsNotEmpty()
  @Column()
  fieldname: string;

  @IsNotEmpty()
  @Column()
  originalname: string;

  @IsNotEmpty()
  @Column()
  encoding: string;

  @IsNotEmpty()
  @Column()
  mimetype: string;

  @IsNotEmpty()
  @Column()
  @IsNumber()
  size: number;

  @IsNotEmpty()
  @Column()
  bucket: string;

  @IsNotEmpty()
  @Column()
  key: string;

  @IsNotEmpty()
  @Column()
  acl: string;

  @IsNotEmpty()
  @Column()
  contentType: string;

  @IsNotEmpty()
  @Column()
  storageClass: string;

  @IsNotEmpty()
  @Column()
  location: string;

  @IsNotEmpty()
  @Column()
  etag: string;

  // @Column()
  // movieCurrentEp: number;

  // @Column()
  // movieDescription: string;

  // @IsNotEmpty()
  // @Column()
  // movieLogo: string;

  // @Column()
  // movieM3U8: string;

  // @Column()
  // movieRating: string;

  // @IsNotEmpty()
  // @Column()
  // movieTitle: string;

  // @Column()
  // movieTotalEp: number;

  // @Column()
  // movieYear: string;
}
