import { PagesCategory, PagesDocument, PagesModel } from './pages.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { Model } from 'mongoose';
import type { CreatePagesDto } from './dto/create-page.dto';

@Injectable()
export class PagesService {
    constructor(@InjectModel(PagesModel.name) private readonly pagesModel: Model<PagesDocument>) {}

    async create(dto: CreatePagesDto) {
        return this.pagesModel.create(dto);
    }

    async findById(id: string) {
        return this.pagesModel.findById(id).exec();
    }

    async findByAlias(alias: string) {
        return this.pagesModel.findOne({ alias }).exec();
    }

    async findByCategory(firstCategory: PagesCategory) {
        return this.pagesModel
            .find({ firstCategory }, { alias: 1, secondCategory: 1, title: 1 })
            .exec();
    }

    async deleteById(id: string) {
        return this.pagesModel.findByIdAndRemove(id).exec();
    }

    async updateById(id: string, dto: CreatePagesDto) {
        return this.pagesModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    }
}
