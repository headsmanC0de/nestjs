import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserSchema } from './user.model';
import { JwtModule } from '@nestjs/jwt';
import { getJWTconfig } from 'src/configs';

@Module({
    controllers: [AuthController],
    imports: [
        MongooseModule.forFeature([
            {
                name: 'user',
                schema: UserSchema,
                collection: 'users',
            },
        ]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getJWTconfig,
        }),
    ],
    providers: [AuthService],
})
export class AuthModule {}
