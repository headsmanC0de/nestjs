import { IsEnum } from 'class-validator';
import { PagesCategory } from '../pages.model';

export class FindPageDto {
    @IsEnum(PagesCategory)
    firstCategory: PagesCategory;
}
