import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import type { FindPageDto } from './dto/find-page.dto';
import type { PagesModel } from './pages.model';

@Controller('pages')
export class PagesController {

    @Post('create')
    async create(@Body() dto: Omit<PagesModel, '_id'>) {}

    @Get(':id')
    async get(@Param('id') id: string) {}

    @Delete('id')
    async delete(@Param('id') id: string) {}

    @Patch(':id')
    async patch(@Param('id') id: string, @Body() dto: PagesModel) {}

    @HttpCode(200)
    @Post()
    async find(@Body() dto: FindPageDto) {}
}
