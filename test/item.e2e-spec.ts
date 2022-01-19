import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Connection } from 'mongoose';
import { DatabaseService } from './../src/database/database.service';

// https://github.com/mguay22/nestjs-mongo

describe('ItemController (e2e)', () => {
  let dbConnection: Connection;

  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    dbConnection = moduleFixture
      .get<DatabaseService>(DatabaseService)
      .getDbHandle();
  });

  afterAll(async () => {
    await dbConnection.dropDatabase();
    await dbConnection.close();
    return await app.close();
  });

  beforeEach(async () => {
    await dbConnection.dropDatabase();
    // await dbConnection.collection('items').deleteMany({});
  });

  it('/ (POST) should create an item', async () => {
    const response = await request(app.getHttpServer()).post('/items').send({
      title: 'bona',
    });

    expect(response.status).toBe(201);

    // return request(app.getHttpServer())
    //   .get('/')
    //   .expect(200)
    //   .expect('Hello World!');
  });

  it('/ (GET) should return an array of items', async () => {
    const response = await request(app.getHttpServer()).get('/items');

    expect(response.status).toBe(200);

    // expect(response.body.length).toEqual(1);

    // return request(app.getHttpServer())
    //   .get('/')
    //   .expect(200)
    //   .expect('Hello World!');
  });
});
