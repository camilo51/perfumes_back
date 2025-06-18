import { IsNotEmpty, IsString } from "class-validator";

export class CreateBrandDto {
    @IsString()
    @IsNotEmpty({message: "El nombre del de la marca es obligatorio"})
    name: string;
}
