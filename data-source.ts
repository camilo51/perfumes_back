import { DataSource } from 'typeorm';
import { join } from 'path';
import * as dotenv from 'dotenv';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

dotenv.config();

interface ExtendedPostgresConnectionOptions extends PostgresConnectionOptions {
  seeds?: string[];
}

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE_NAME,
  ssl: true,
  entities: [join(__dirname, 'src', '**', '*.entity.{ts,js}')],
  synchronize: true,
  seeds: ['seeds/**/*{.ts,.js}']
} as ExtendedPostgresConnectionOptions);

export default AppDataSource;