import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { disconnect } from 'mongoose';
import type { INestApplication } from '@nestjs/common';
import type { AuthDto } from './../src/auth/dto/auth.dto';

const loginDto: AuthDto = {
    login: 'somedude@dudes.com',
    password: 'somePassword',
};

describe('AuthController (e2e)', () => {
    let app: INestApplication;
    let createdId: string;
    let token: string;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/auth/login (POST) - success', async () => {
        return request(app.getHttpServer())
            .post('/auth/login')
            .send(loginDto)
            .expect(200)
            .then(({ body }: request.Response) => {
                expect(body.access_token).toBeDefined();
            });
    });

    it('/auth/login (POST) - fail', async () => {
        return request(app.getHttpServer())
            .post('/auth/login')
            .send({ ...loginDto, login: 'incorrectLogin@gmail.com' })
            .expect(401, {
                statusCode: 401,
                message: '[ERROR]: User not found',
                error: 'Unauthorized',
            });
    });

    it('/auth/login (POST) - fail', async () => {
        return request(app.getHttpServer())
            .post('/auth/login')
            .send({ ...loginDto, password: '2' })
            .expect(401, {
                statusCode: 401,
                message: '[ERROR]: Incorrect password',
                error: 'Unauthorized',
            });
    });

    afterAll(() => {
        disconnect();
    });
});
