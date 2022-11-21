import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { Model } from 'mongoose';
import type { FindProductDto } from './dto/find-product.dto';
import type { ProductsModel } from './products.model';
import type { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
    constructor(@InjectModel('products') private readonly productsModel: Model<ProductsModel>) {}

    async create(dto: CreateProductDto) {
        return this.productsModel.create(dto);
    }

    async findById(id: string) {
        return this.productsModel.findById(id).exec();
    }

    async deleteById(id: string) {
        return this.productsModel.findByIdAndDelete(id).exec();
    }

    async updateById(id, dto: CreateProductDto) {
        return this.productsModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    }

    async findWithReviews(dto: FindProductDto) {
        return this.productsModel.aggregate([]);
    }
}
