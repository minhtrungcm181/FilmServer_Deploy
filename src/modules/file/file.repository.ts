import { encodeStringPathToBase64 } from '@common/fileurl.strategy';
import { File } from '@entities/file.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { GetSharedFilesDto } from './dto/get-shared-files';

@Injectable()
export class FileRepository {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
  ) {}

  async createFileRecord(file: File): Promise<string> {
    const savedFile = await this.fileRepository.save(file);
    if (savedFile) {
      return file.location;
    } else {
      return null;
    }
  }

  async getKeyOfFileById(fileId: string): Promise<string> {
    const option: FindOneOptions<File> = {where: {id: fileId}};
    const file = await this.fileRepository.findOne(option);
    return file.key;
  }

  async getFileByKey(fileKey: string): Promise<File> {
    const option: FindOneOptions<File> = {where: {key: fileKey}};
    const file = await this.fileRepository.findOne(option);
    return file;
  }

  async deleteFile(key: string): Promise<boolean> {
   
    const deleteProcess = await this.fileRepository.delete({ key });
    if (deleteProcess) console.log('file1');
    else return false;
  }

  async listAll(): Promise<File[]> {
    const listProcess = await this.fileRepository.find();
    return listProcess;
  }

  async listAllSharedFiles(host: string): Promise<GetSharedFilesDto[]> {
    const allFileDB = await this.listAll();
    const listOfSharedLink = allFileDB.map((file) => {
      return {
        url: `${host}/${encodeStringPathToBase64(file.id)}`,
        // movieCurrentEp: file.movieCurrentEp,
        // movieDescription: file.movieDescription,
        // movieLogo: file.movieLogo,
        // movieM3U8: file.movieM3U8,
        // movieRating: file.movieRating,
        // movieTitle: file.movieTitle,
        // movieTotalEp: file.movieTotalEp,
        // movieYear: file.movieYear,
      };
    });

    return listOfSharedLink;
  }

  async findByName(originalname: string): Promise<File> {
    const option: FindOneOptions<File> = {where: {originalname}};
    const fileProcess = await this.fileRepository.findOne(option);
    return fileProcess;
  }

  async countRecords(): Promise<number> {
    const count = await this.fileRepository.count();
    return count;
  }

  async rename(key: string, newName: string): Promise<boolean> {
    const process = await this.fileRepository.update({key: key}, {originalname: newName});
    if (process) {
      return true;
    } else {
      return false;
    }
  }

  async getFileExtension(filename: string): Promise<string> {
    return filename.split('.').pop();
  }
}
