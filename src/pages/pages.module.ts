import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PagesController } from './pages.controller';
import { PagesSchema } from './pages.model';

@Module({
    controllers: [PagesController],
    imports: [
        MongooseModule.forFeature([
            {
                name: 'pages',
                schema: PagesSchema,
                collection: 'pages',
            },
        ]),
    ],
})
export class PagesModule {}
