import { Module } from '@nestjs/common';
import { PerfumesService } from './perfumes.service';
import { PerfumesController } from './perfumes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Perfume } from './entities/perfume.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Perfume])],
  controllers: [PerfumesController],
  providers: [PerfumesService],
})
export class PerfumesModule {}
