import {GetObjectCommand} from '@aws-sdk/client-s3';
import {S3Service} from '@modules/s3/s3.service';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Readable} from 'stream';
import {Repository} from 'typeorm';
import {File} from './entities/file.entity';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
    private readonly s3service: S3Service,
  ) {}

  async createFile(newFile: File) {
    return await this.fileRepository.save(newFile);
  }

  async getFileFromS3ByFileName(bucketName: string, fileName: string): Promise<Readable> {
    const getObjectCommand = new GetObjectCommand({Bucket: bucketName, Key: fileName});
    const response = await this.s3service.client.send(getObjectCommand);
    const objectStream = response.Body as Readable;
    return objectStream;
  }
}
