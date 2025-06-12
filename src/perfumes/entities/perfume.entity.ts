import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Perfume {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 50, nullable: false })
    name: string;

    @Column({ type: 'integer', nullable: false })
    price: number;

    @Column({ type: 'text', nullable: false })
    description: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    image: string;

    @Column({ type: 'integer', nullable: false, default: 0 })
    stock: number;

    @Column({ type: 'varchar', length: 50, nullable: true })
    brand: string;
}
