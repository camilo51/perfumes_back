import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePerfumeDto } from './dto/create-perfume.dto';
import { UpdatePerfumeDto } from './dto/update-perfume.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Perfume } from './entities/perfume.entity';
import { FindManyOptions, In, Repository } from 'typeorm';
import cloudinary from 'src/config/cloudinary';
import {v4 as uuid} from 'uuid';
import { Category } from 'src/categories/entities/category.entity';
import { Aroma } from 'src/aromas/entities/aroma.entity';
import { Brand } from 'src/brands/entities/brand.entity';

@Injectable()
export class PerfumesService {

  constructor(
      @InjectRepository(Perfume) private readonly perfumeRepository: Repository<Perfume>,
      @InjectRepository(Category) private readonly categoryRepository: Repository<Category>,
      @InjectRepository(Aroma) private readonly aromaRepository: Repository<Aroma>,
      @InjectRepository(Brand) private readonly brandRepository: Repository<Brand>,
  ) {}

  async create(createPerfumeDto: CreatePerfumeDto) {
    const { name, price, description, image, stock, categories: categoriesIds, aromas: aromasIds, brand: brandId } = createPerfumeDto;

    try {
      const perfume = new Perfume();
      perfume.name = name;
      perfume.price = price;
      perfume.description = description;
  
      const imageName = uuid();
      const result = await cloudinary.uploader.upload(image, {public_id: imageName, folder: 'perfumes'})
      perfume.image = result.secure_url;
      perfume.stock = stock;

      const categories = await this.categoryRepository.find({
        where: { id: In(categoriesIds) }
      });
      perfume.categories = categories;

      const aromas = await this.aromaRepository.find({
        where: { id: In(aromasIds) }
      });
      perfume.aromas = aromas;

      const brand = await this.brandRepository.findOne({
        where: { id: brandId }
      });
      if (!brand) {
        throw new Error('Brand not found');
      }
      perfume.brand = brand;
  
      await this.perfumeRepository.save(perfume);
      return {message: 'Perfume creado correctamente'};
    } catch (error) {
      throw new InternalServerErrorException("Error al crear el perfume");
    }
  }

  async findAll(limit?: number) {
    try {
      
      const options: FindManyOptions<Perfume> = {
        order: {id: 'DESC'}
      }
      if (limit) {
        options.take = limit;
      }
        
      const perfumes = await this.perfumeRepository.find(options);
      return perfumes;
    } catch (error) {
      throw new InternalServerErrorException("Error al cargar los perfumes");
    }
  }

  async findOne(id: number) {
    try {

      const perfume = await this.perfumeRepository.findOne({where: {id: id}});
      if (!perfume) {
        throw new NotFoundException("No se encontro el perfume");
      }

      const data = {
        ...perfume,
        categories: perfume.categories.map((category) => category.id),
        aromas: perfume.aromas.map((aroma) => aroma.id),
        brand: perfume.brand.id
      }
      return data;
    } catch (error) {
      throw new InternalServerErrorException("Error al intentar buscar un perfume");
    }
  }

  async update(id: number, data: UpdatePerfumeDto) {

    try {
      const perfume = await this.perfumeRepository.findOne({where:{id: id}, relations: ["categories", "aromas", "brand"]});
  
      if (!perfume) {
        throw new NotFoundException("Perfume no encontrado");
      }
  
      perfume.name = data.name!;
      perfume.price = data.price!;
      perfume.description = data.description!;
  
      if(data.image?.startsWith('data:image/')){
        const imageName = uuid();
        const result = await cloudinary.uploader.upload(data.image, {public_id: imageName, folder: 'perfumes'})
        perfume.image = result.secure_url;
      }
  
      perfume.stock = data.stock!;
  
      if (data.categories && data.categories.length > 0) {
        const categories = await this.categoryRepository.findBy({
          id: In(data.categories),
        });
        perfume.categories = categories;
      }
  
      // Actualizar aromas
      if (data.aromas && data.aromas.length > 0) {
        const aromas = await this.aromaRepository.findBy({
          id: In(data.aromas),
        });
        perfume.aromas = aromas;
      }
  
      // Actualizar marca (uno solo)
      if (data.brand) {
        const brand = await this.brandRepository.findOneBy({ id: data.brand });
        if (!brand) throw new NotFoundException('Marca no encontrada');
        perfume.brand = brand;
      }
  
  
      await this.perfumeRepository.save(perfume);
      return {message: "Perfume editado correctamente"}; 
      
    } catch (error) {
      throw new InternalServerErrorException("Error al intentar actualizar el perfume"); 
    }
  }

  async remove(id: number) {
    try {
      const perfume = await this.perfumeRepository.findOneBy({ id });
      if (!perfume) {
        throw new NotFoundException(`Perfume con ID ${id} no encontrado`);
      }
      await this.perfumeRepository.remove(perfume);

      return { message: 'Perfume eliminado correctamente' };
    } catch (error) {
      throw new InternalServerErrorException("Error al intentar eliminar el perfume"); 
    }
  }
}
