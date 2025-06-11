import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { comparePassword, hashPassword } from 'utils/bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepository.findOne({ where: { email: createUserDto.email } });
    if (existingUser) {
      throw new BadRequestException('El coreo ya está registrado');
    }
    try {
      const user = new User();
      user.name = createUserDto.name;
      user.email = createUserDto.email;
      user.phone = createUserDto.phone;
      user.password = await hashPassword(createUserDto.password);
      this.userRepository.save(user)
      return {message: "Usuario creado correctamente"};
    } catch (error) {
      throw new BadRequestException('Error al crear el usuario');
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(email: string, password: string) {
    try {
      const user = await this.userRepository.findOne({ where: { email } });
      if (!user) {
        throw new BadRequestException('Usuario no encontrado');
      }
      const validatePassword = await comparePassword(password, user.password);   
      if (!validatePassword) {
        throw new BadRequestException('Contraseña incorrecta');
      }
      return {
        message: 'Sesión iniciada correctamente',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
          role: user.role,
        }
      }
    } catch (error) {
      throw new BadRequestException('Error al buscar el usuario');
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
