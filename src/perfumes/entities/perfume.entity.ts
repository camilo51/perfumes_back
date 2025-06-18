import { Aroma } from "src/aromas/entities/aroma.entity";
import { Brand } from "src/brands/entities/brand.entity";
import { Category } from "src/categories/entities/category.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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

    @ManyToMany(() => Category, (category) => category.perfumes, {
        cascade: true,
        eager: true
    })
    @JoinTable()
    categories: Category[];

    @ManyToMany(() => Aroma, (aroma) => aroma.perfumes, {
        cascade: true,
        eager: true
    })
    @JoinTable()
    aromas: Aroma[];

    @ManyToOne(() => Brand, (brand) => brand.perfumes, {eager: true})
    brand: Brand;
}
