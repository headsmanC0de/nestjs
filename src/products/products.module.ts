import { ProductsSchema } from './products.model';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsController } from './products.controller';

@Module({
    controllers: [ProductsController],
    imports: [
        MongooseModule.forFeature([
            {
                name: 'products',
                schema: ProductsSchema,
                collection: 'products',
            },
        ]),
    ],
})
export class ProductsModule {}
