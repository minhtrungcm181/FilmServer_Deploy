import {Controller, Get, Post, Body, Patch, Param, Delete, Put} from '@nestjs/common';
import {DemoUserService} from './demo-user.service';
import {CreateDemoUserDto} from './dto/create-demo-user.dto';
import {UpdateDemoUserDto} from './dto/update-demo-user.dto';

@Controller('demo-user')
export class DemoUserController {
  constructor(private readonly demoUserService: DemoUserService) {}

  @Post()
  create(@Body() createDemoUserDto: CreateDemoUserDto) {
    return this.demoUserService.create(createDemoUserDto);
  }

  @Get()
  findAll() {
    return this.demoUserService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.demoUserService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDemoUserDto: UpdateDemoUserDto) {
    return this.demoUserService.update(id, updateDemoUserDto);
  }

  @Put()
  save(@Body() updateDemoUserDto: UpdateDemoUserDto) {
    return this.demoUserService.save(updateDemoUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.demoUserService.remove(+id);
  }
}
