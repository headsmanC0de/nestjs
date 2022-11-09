import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthSchema } from './auth.model';

@Module({
    controllers: [AuthController],
    imports: [
        MongooseModule.forFeature([
            {
                name: 'auth',
                schema: AuthSchema,
                collection: 'auth',
            },
        ]),
    ],
})
export class AuthModule {}
