import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

export class ProductCharacteristicDto {
    @IsString()
    name: string;

    @IsString()
    value: string;
}

export class CreateProductDto {
    image: string;

    @IsString()
    title: string;

    @IsNumber()
    price: number;

    @IsNumber()
    oldPrice?: number;

    @IsOptional()
    @IsNumber()
    credit: number;

    @IsNumber()
    description: string;

    @IsString()
    advantages: string;

    @IsString()
    disAdvantages: string;

    @IsString({ each: true })
    categories: string[];

    @IsArray()
    @IsString({ each: true })
    tags: string[];

    @IsArray()
    @ValidateNested()
    @Type(()=> ProductCharacteristicDto)
    characteristics: ProductCharacteristicDto[];

    createdAt: Date;
    updatedAt: Date;
}
