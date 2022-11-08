import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { PagesModule } from './pages/pages.module';
import { ProductsModule } from './products/products.module';
import { ReviewModule } from './review/review.module';

@Module({
    imports: [
		ConfigModule.forRoot(),
		AuthModule,
		PagesModule,
		ProductsModule,
		ReviewModule
	],
    controllers: [AppController, AuthController],
    providers: [AppService],
})
export class AppModule {}
