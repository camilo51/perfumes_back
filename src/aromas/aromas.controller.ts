import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AromasService } from './aromas.service';
import { CreateAromaDto } from './dto/create-aroma.dto';
import { UpdateAromaDto } from './dto/update-aroma.dto';

@Controller('aromas')
export class AromasController {
  constructor(private readonly aromasService: AromasService) {}

  @Post('create')
  create(@Body() createAromaDto: CreateAromaDto) {
    return this.aromasService.create(createAromaDto);
  }

  @Get()
  findAll() {
    return this.aromasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aromasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAromaDto: UpdateAromaDto) {
    return this.aromasService.update(+id, updateAromaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aromasService.remove(+id);
  }
}
