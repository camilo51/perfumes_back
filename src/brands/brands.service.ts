import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from './entities/brand.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BrandsService {
  
  constructor(
    @InjectRepository(Brand) private readonly brandRepository: Repository<Brand>  
  ){}

  async create(createBrandDto: CreateBrandDto) {
    const {name} = createBrandDto;
    try {
      const brand = new Brand();
      brand.name = name;
      await this.brandRepository.save(brand);
      return {message: "Marca creada correctamente."}
    } catch (error) {
      throw new InternalServerErrorException("Error al intentar crear la marca.")
    }
  }

  async findAll() {
    try {
      const brands = await this.brandRepository.find();
      return brands;
    } catch (error) {
      throw new InternalServerErrorException("Error al obtener las marcas.")
    }
  }
  async findOne(id: number) {
    try {
      const brands = await this.brandRepository.findOne({where: {id: id}});
      if (!brands) {
        throw new NotFoundException("No se encontró la marca")
      }
      return brands;
    } catch (error) {
      throw new InternalServerErrorException("Error al intentar buscar una marca");
    }
  }

  async update(id: number, data: UpdateBrandDto) {
    try {
       const brand = await this.brandRepository.findOne({where: {id: id}});
       if (!brand) {
          throw new NotFoundException("No se encontró la marca");
       }
       brand.name = data.name!;
       this.brandRepository.save(brand);
       return {message: "Marca actualizada correctamente"}
    } catch (error) {
      throw new InternalServerErrorException("Error al intentar actualizar una marca");
    }
  }

  async remove(id: number) {
    try {
      const brand = await this.brandRepository.findOneBy({id})
      if (!brand) {
        throw new NotFoundException("No se encontro la marca para eliminar")
      }
      await this.brandRepository.remove(brand);
      return {message: "Marca eliminada correctamente"}
    } catch (error) {
      throw new InternalServerErrorException("Error al intentar eliminar una marca");
    }
  }
}
