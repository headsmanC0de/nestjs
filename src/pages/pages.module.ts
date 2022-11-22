import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PagesController } from './pages.controller';
import { PagesModel, PagesSchema } from './pages.model';

@Module({
    controllers: [PagesController],
    imports: [
        MongooseModule.forFeature([
            {
                name: PagesModel.name,
                schema: PagesSchema,
                collection: 'pages',
            },
        ]),
    ],
})
export class PagesModule {}
