import { IsInt, IsPositive, IsString, Min, MinLength } from "class-validator";

export class CreatePokemonDto {

    @IsString()
    @MinLength(3)
    readonly name: string;

    @IsInt()
    @IsPositive()
    @Min(1)
    readonly no: number;
}
