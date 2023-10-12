import {S3Client} from '@aws-sdk/client-s3';
import {Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';

@Injectable()
export class S3Service {
  private s3: S3Client;

  constructor(config: ConfigService) {
    this.s3 = new S3Client({
      region: config.get<string>('S3_REGION'),
      endpoint: config.get<string>('S3_ENDPOINT'),
      credentials: {
        accessKeyId: config.get<string>('S3_ACCESS_KEY'),
        secretAccessKey: config.get<string>('S3_SECRET_KEY'),
      },
      forcePathStyle: true,
    });
  }

  get client(): S3Client {
    return this.s3;
  }
}
