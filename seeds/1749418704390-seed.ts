import { User } from '../src/users/entities/user.entity';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { hashPassword } from '../utils/bcrypt';

export class Seed1749418704390 implements Seeder {
    track = false;

    public async run(
        dataSource: DataSource,
    ): Promise<any> {
        const reposiory = dataSource.getRepository(User);
        await reposiory.insert([
            {
                name: 'Admin',
                email: 'correo@correo.com',
                phone: '1234567890',
                password: await hashPassword('123456'),
                address: 'Calle Falsa 123',
                role: 1,
            }
        ])
    }
}
