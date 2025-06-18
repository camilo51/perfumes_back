import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateAromaDto {
    @IsString()
    @IsNotEmpty({message: "El nombre del aroma es obligatorio"})
    name: string;

    @IsNumber()
    @IsNotEmpty({message: "El precio del aroma es obligatorio"})
    price: number
}
