import { ProductsSchema } from './products.model';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

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
    providers: [ProductsService],
})
export class ProductsModule {}
