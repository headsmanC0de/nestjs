import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    NotFoundException,
    Param,
    Patch,
    Post,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductDto } from './dto/find-product.dto';
import { PRODUCT_NOT_FOUND_ERROR } from './products.constants';
import { ProductsService } from './products.service';
import type { ProductsModel } from './products.model';

@Controller('product')
export class ProductsController {
    constructor(private readonly productService: ProductsService) {}

    @Post('create')
    async create(@Body() dto: CreateProductDto) {
        return this.productService.create(dto);
    }

    @Get(':id')
    async get(@Param('id') id: string) {
        const product = await this.productService.findById(id);
        if (!product) {
            throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR);
        }
        return product;
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        const deletedProduct = await this.productService.deleteById(id);
        if (!deletedProduct) {
            throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR);
        }
    }

    @Patch(':id')
    async patch(@Param('id') id: string, @Body() dto: ProductsModel) {
        const updatedProduct = await this.productService.updateById(id, dto);
        if (!updatedProduct) {
            throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR);
        }
        return updatedProduct;
    }

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Post('find')
    async find(@Body() dto: FindProductDto) {
        return this.productService.findWithReviews(dto);
    }
}
