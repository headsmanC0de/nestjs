import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserSchema } from './user.model';
import { JwtModule } from '@nestjs/jwt';
import { getJWTConfig } from '../configs';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
    controllers: [AuthController],
    imports: [
        MongooseModule.forFeature([
            {
                name: 'users',
                schema: UserSchema,
                collection: 'users',
            },
        ]),
        ConfigModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getJWTConfig,
        }),
        PassportModule,
    ],
    providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
