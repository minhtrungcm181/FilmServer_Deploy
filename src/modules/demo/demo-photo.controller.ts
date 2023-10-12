import {Controller, Get, Post, Body, Patch, Param, Delete, Put} from '@nestjs/common';
import {DemoPhotoService} from './demo-photo.service';
import {CreateDemoPhotoDto} from './dto/create-demo-photo.dto';
import {UpdateDemoPhotoDto} from './dto/update-demo-photo.dto';

@Controller('demo-photo')
export class DemoPhotoController {
  constructor(private readonly demoPhotoService: DemoPhotoService) {}

  @Post()
  create(@Body() createDemoPhotoDto: CreateDemoPhotoDto) {
    return this.demoPhotoService.create(createDemoPhotoDto);
  }

  @Get()
  findAll() {
    return this.demoPhotoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.demoPhotoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDemoPhotoDto: UpdateDemoPhotoDto) {
    return this.demoPhotoService.update(id, updateDemoPhotoDto);
  }

  @Put()
  save(@Body() updateDemoPhotoDto: UpdateDemoPhotoDto) {
    return this.demoPhotoService.save(updateDemoPhotoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.demoPhotoService.remove(+id);
  }
}
