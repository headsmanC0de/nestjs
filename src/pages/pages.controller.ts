import { CreatePagesDto } from './dto/create-page.dto';
import { PagesService } from './pages.service';
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
    UseGuards,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { IdValidationPipe } from 'src/pipes';
import { PAGE_NOT_FOUND_ID, PAGE_NOT_FOUND_ALIAS } from './pages.constants';
import type { FindPageDto } from './dto/find-page.dto';
import type { PagesModel } from './pages.model';
import { JwtAuthGuard } from 'src/auth/guards';

@Controller('pages')
export class PagesController {
    constructor(private readonly pagesService: PagesService) {}

    @UseGuards(JwtAuthGuard)
    @Post('create')
    async create(@Body() dto: CreatePagesDto) {
        return this.pagesService.create(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async get(@Param('id', IdValidationPipe) id: string) {
        const page = await this.pagesService.findById(id);

        if (!page) {
            throw new NotFoundException(PAGE_NOT_FOUND_ID);
        }

        return page;
    }

    @Get('byAlias/:alias')
    async getByAlias(@Param('alias') alias: string) {
        const page = await this.pagesService.findByAlias(alias);

        if (!page) {
            throw new NotFoundException(PAGE_NOT_FOUND_ALIAS);
        }

        return page;
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id', IdValidationPipe) id: string) {
        const deletedPage = await this.pagesService.deleteById(id);

        if (!deletedPage) {
            throw new NotFoundException(PAGE_NOT_FOUND_ID);
        }
    }

    @Patch(':id')
    async patch(@Param('id', IdValidationPipe) id: string, @Body() dto: PagesModel) {
        const updatePage = await this.pagesService.updateById(id, dto);

        if (!updatePage) {
            throw new NotFoundException(PAGE_NOT_FOUND_ID);
        }
        return updatePage;
    }

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Post('find')
    async find(@Body() dto: FindPageDto) {
        return this.pagesService.findByCategory(dto.firstCategory);
    }
}
