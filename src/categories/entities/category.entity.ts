import { Perfume } from "src/perfumes/entities/perfume.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 50, nullable: false })
    name: string

    @ManyToMany(() => Perfume, (perfume) => perfume.categories)
    perfumes: Perfume[];
}
