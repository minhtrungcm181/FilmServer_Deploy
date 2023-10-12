import {Injectable, Logger} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {CreateDemoUserDto} from './dto/create-demo-user.dto';
import {UpdateDemoUserDto} from './dto/update-demo-user.dto';
import {DemoUser} from './entities/demo-user.entity';

@Injectable()
export class DemoUserService {
  constructor(
    @InjectRepository(DemoUser)
    private demoUserRepository: Repository<DemoUser>,
    private readonly logger: Logger,
  ) {}

  async create(demoUserDto: CreateDemoUserDto) {
    // this.logger.debug(`create demoUserDto: ${JSON.stringify(demoUserDto)}`, DemoUserService.name);
    const result = await this.demoUserRepository.insert(demoUserDto);

    return this.demoUserRepository.findOneBy({id: result.identifiers['id']});
  }

  findAll() {
    return this.demoUserRepository.find();
  }

  findOne(id: string) {
    return this.demoUserRepository.findOneBy({id: id});
  }

  async update(id: string, updateDemoDto: UpdateDemoUserDto) {
    // this.logger.debug(`update demoUserDto: ${JSON.stringify(updateDemoDto)}`, DemoUserService.name);

    await this.demoUserRepository.update({id}, updateDemoDto);
    return this.demoUserRepository.preload({id});
  }

  save(updateDemoDto: UpdateDemoUserDto) {
    return this.demoUserRepository.save(updateDemoDto);
  }

  remove(id: number) {
    return `This action removes a #${id} demo`;
  }
}
