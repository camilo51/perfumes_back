import { Module } from '@nestjs/common';
import { AromasService } from './aromas.service';
import { AromasController } from './aromas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aroma } from './entities/aroma.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Aroma])],
  controllers: [AromasController],
  providers: [AromasService],
})
export class AromasModule {}
