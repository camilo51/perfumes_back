import { Injectable } from '@nestjs/common';
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
  

  create(createCategoryDto: CreateCategoryDto) {
    const {name} = createCategoryDto;

    try {
      const category = new Category();
      category.name = name;
      this.categoryRepository.save(category)

      return {message: "Categoria creada correctamente"};
    } catch (error) {
      console.log(`Error al crear la categoria: ${error}`);
    }

  }

  findAll() {
    try {
      const categories = this.categoryRepository.find({order: {id: 'DESC'}})
      return categories;
    } catch (error) {
      console.log(`Error al cargar las categorias: ${error}`);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
