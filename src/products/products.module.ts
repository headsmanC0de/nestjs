import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsController } from './products.controller';
import { ProductsModel, ProductsSchema } from './products.model';
import { ProductsService } from './products.service';

@Module({
    controllers: [ProductsController],
    imports: [
        MongooseModule.forFeature([
            {
                name: ProductsModel.name,
                schema: ProductsSchema,
                collection: 'products',
            },
        ]),
    ],
    providers: [ProductsService],
})
export class ProductsModule {}
