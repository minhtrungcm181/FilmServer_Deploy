import {Injectable, Logger} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {CreateDemoPhotoDto} from './dto/create-demo-photo.dto';
import {UpdateDemoPhotoDto} from './dto/update-demo-photo.dto';
import {DemoPhoto} from './entities/demo-photo.entity';

@Injectable()
export class DemoPhotoService {
  constructor(
    @InjectRepository(DemoPhoto)
    private demoPhotoRepository: Repository<DemoPhoto>,
    private readonly logger: Logger,
  ) {}

  async create(demoPhotoDto: CreateDemoPhotoDto) {
    // this.logger.debug(`create demoPhotoDto: ${JSON.stringify(demoPhotoDto)}`, DemoPhotoService.name);
    const result = await this.demoPhotoRepository.insert(demoPhotoDto);

    return this.demoPhotoRepository.findOneBy({id: result.identifiers['id']});
  }

  findAll() {
    return this.demoPhotoRepository.find();
  }

  findOne(id: string) {
    return this.demoPhotoRepository.findOneBy({id: id});
  }

  async update(id: string, updateDemoDto: UpdateDemoPhotoDto) {
    // this.logger.debug(`update demoPhotoDto: ${JSON.stringify(updateDemoDto)}`, DemoPhotoService.name);

    await this.demoPhotoRepository.update({id}, updateDemoDto);
    return this.demoPhotoRepository.preload({id});
  }

  save(updateDemoDto: UpdateDemoPhotoDto) {
    return this.demoPhotoRepository.save(updateDemoDto);
  }

  remove(id: number) {
    return `This action removes a #${id} demo`;
  }
}
