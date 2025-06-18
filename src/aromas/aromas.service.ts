import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateAromaDto } from './dto/create-aroma.dto';
import { UpdateAromaDto } from './dto/update-aroma.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Aroma } from './entities/aroma.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AromasService {
  
  constructor(
    @InjectRepository(Aroma) private readonly aromaRepository: Repository<Aroma>,
  ){}
  
  async create(createAromaDto: CreateAromaDto) {
    const {name, price} = createAromaDto;

    try {
      const aroma = new Aroma();
      aroma.name = name;
      aroma.price = price

      await this.aromaRepository.save(aroma);
      return {message: "Aroma creado correctamente"};
    } catch (error) {
      throw new InternalServerErrorException(`Error al crear el aroma`)
    }

  }

  async findAll() {
    try {
      const aromas = await this.aromaRepository.find();
      return aromas;
    } catch (error) {
      throw new InternalServerErrorException(`Error al obtener los aromas`)
    }
  }

  async findOne(id: number) {
    try {
      const aroma = await this.aromaRepository.findOne({where: {id: id}});
      if (!aroma) {
        throw new NotFoundException("No se encontró el aroma")
      }
      return aroma;
    } catch (error) {
      throw new InternalServerErrorException("Error al intentar buscar un aroma");
    }
  }

  async update(id: number, data: UpdateAromaDto) {
    try {
       const aroma = await this.aromaRepository.findOne({where: {id: id}});
       if (!aroma) {
          throw new NotFoundException("No se encontró el aroma");
       }
       aroma.name = data.name!;
       aroma.price = data.price!;
       this.aromaRepository.save(aroma);
       return {message: "Aroma actualizado correctamente"}
    } catch (error) {
      throw new InternalServerErrorException("Error al intentar actualizar el aroma");
    }
  }

  async remove(id: number) {
    try {
      const category = await this.aromaRepository.findOneBy({id})
      if (!category) {
        throw new NotFoundException("No se encontro un aroma para eliminar")
      }
      await this.aromaRepository.remove(category);
      return {message: "Aroma eliminado correctamente"}
    } catch (error) {
      throw new InternalServerErrorException("Error al intentar eliminar el aroma");
    }
  }
}
