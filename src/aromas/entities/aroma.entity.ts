import { Perfume } from "src/perfumes/entities/perfume.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Aroma {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 50, nullable: false })
    name: string;

    @Column({ type: "integer", nullable: false})
    price: number;

    @ManyToMany(() => Perfume, (perfume) => perfume.aromas)
    perfumes: Perfume[];
}
