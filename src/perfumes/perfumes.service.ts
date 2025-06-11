import { Injectable } from '@nestjs/common';
import { CreatePerfumeDto } from './dto/create-perfume.dto';
import { UpdatePerfumeDto } from './dto/update-perfume.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Perfume } from './entities/perfume.entity';
import { Repository } from 'typeorm';
import cloudinary from 'src/config/cloudinary';
import {v4 as uuid} from 'uuid';

@Injectable()
export class PerfumesService {

  constructor(
      @InjectRepository(Perfume) private readonly perfumeRepository: Repository<Perfume>,
  ) {}

  async create(createPerfumeDto: CreatePerfumeDto) {
    const { name, price, description, image, stock } = createPerfumeDto;

    try {
      const perfume = new Perfume();
      perfume.name = name;
      perfume.price = price;
      perfume.description = description;
  
      const imageName = uuid();
      const result = await cloudinary.uploader.upload(image, {public_id: imageName, folder: 'perfumes'})
      perfume.image = result.secure_url;
      perfume.stock = stock;
  
      this.perfumeRepository.save(perfume);
      return {message: 'Perfume creado correctamente'};
    } catch (error) {
      console.log(`Error al crear el perfume: ${error}`);
    }
  }

  findAll() {
    try {
      const perfumes = this.perfumeRepository.find({order: {id: 'DESC'}})
      return perfumes;
    } catch (error) {
      console.log(`Error al cargar los perfumes: ${error}`);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} perfume`;
  }

  update(id: number, updatePerfumeDto: UpdatePerfumeDto) {
    return `This action updates a #${id} perfume`;
  }

  remove(id: number) {
    return `This action removes a #${id} perfume`;
  }
}
