import { Perfume } from "src/perfumes/entities/perfume.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Brand {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 50, nullable: false })
    name: string;

    @OneToMany(() => Perfume, (perfume) => perfume.brand)
    perfumes: Perfume[];
}
