import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {

  constructor(
        @InjectRepository(Category) private readonly categoryRepository: Repository<Category>,
    ) {}
  

  async create(createCategoryDto: CreateCategoryDto) {
    const {name} = createCategoryDto;

    try {
      const category = new Category();
      category.name = name;
      await this.categoryRepository.save(category)

      return {message: "Categoria creada correctamente"};
    } catch (error) {
      throw new InternalServerErrorException("Error al crear la categoria");
    }

  }

  async findAll() {
    try {
      const categories = await this.categoryRepository.find({order: {id: 'DESC'}})
      return categories;
    } catch (error) {
      throw new InternalServerErrorException("Error al cargar las categorias");
    }
  }

  async findOne(id: number) {
    try {
      const categoria = await this.categoryRepository.findOne({where: {id: id}});
      if (!categoria) {
        throw new NotFoundException("No se encontró la categoria")
      }
      return categoria;
    } catch (error) {
      throw new InternalServerErrorException("Error al intentar buscar una categoria");
    }
  }

  async update(id: number, data: UpdateCategoryDto) {
    try {
       const category = await this.categoryRepository.findOne({where: {id: id}});
       if (!category) {
          throw new NotFoundException("No se encontró la categoria");
       }
       category.name = data.name!;
       this.categoryRepository.save(category);
       return {message: "Categoria actualizada correctamente"}
    } catch (error) {
      throw new InternalServerErrorException("Error al intentar actualizar una categoria");
    }
  }

  async remove(id: number) {
    try {
      const category = await this.categoryRepository.findOneBy({id})
      if (!category) {
        throw new NotFoundException("No se encontro la categoria para eliminar")
      }
      await this.categoryRepository.remove(category);
      return {message: "Categoria eliminada correctamente"}
    } catch (error) {
      throw new InternalServerErrorException("Error al intentar eliminar una categoria");
    }
  }
}
