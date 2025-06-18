import { Module } from '@nestjs/common';
import { PerfumesService } from './perfumes.service';
import { PerfumesController } from './perfumes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Perfume } from './entities/perfume.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Aroma } from 'src/aromas/entities/aroma.entity';
import { Brand } from 'src/brands/entities/brand.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Perfume, Category, Aroma, Brand])],
  controllers: [PerfumesController],
  providers: [PerfumesService],
})
export class PerfumesModule {}
