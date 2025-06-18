import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePerfumeDto {
    @IsString()
    @IsNotEmpty({ message: 'El nombre del perfume es obligatorio' })
    name: string;

    @IsNumber()
    @IsNotEmpty({ message: 'El precio del perfume es obligatorio' })
    price: number;

    @IsString()
    @IsNotEmpty({ message: 'La descripción del perfume es obligatoria' })
    description: string;

    @IsString()
    @IsNotEmpty({ message: 'La imagen del perfume es obligatoria' })
    image: string;

    @IsNumber()
    @IsNotEmpty({ message: 'La cantidad del producto disponibles es obligatoria' })
    stock: number;

    @IsArray()
    @IsNotEmpty({ message: 'Las categorías del perfume es obligatoria' })
    categories: [];

    @IsArray()
    @IsNotEmpty({ message: 'Los aromas del perfume es obligatorios' })
    aromas: [];

    @IsNumber()
    @IsNotEmpty({ message: 'La marca del perfume es obligatoria' })
    brand: number;
}
