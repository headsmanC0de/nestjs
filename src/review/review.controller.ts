import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import type { ReviewsModel } from './review.model';

@Controller('review')
export class ReviewController {
    @Post('create')
    async create(@Body() dto: Omit<ReviewsModel, '_id'>) {}

    @Delete('id')
    async delete(@Param('id') id: string) {}

    @Get('byProduct/productId')
    async getByProduct(@Param('id') id: string) {}
}
