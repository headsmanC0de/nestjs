import { IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateReviewDto {
    @IsString()
    name: string;

    @IsString()
    title: string;

    @IsString()
    description: string;

    @Max(5, { message: 'Rating cannot be more than 5' })
    @Min(1, { message: 'Rating cannot be less than 1' })
    @IsNumber({}, { message: 'Must be a number' })
    rating: number;

    @IsString({ message: 'Must be a string' })
    productId: string;
}
