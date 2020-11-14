import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule, HttpService, INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { of, throwError } from 'rxjs';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CountriesApiService } from '../src/countries/services/countries.api.service';
import { CountriesService } from '../src/countries/services/countries.service';

describe('CountriesController (e2e)', () => {
  let app: INestApplication;
  let httpService: HttpService;
  const data = [
    {
      name: 'New Caledonia',
      alpha2Code: 'NC',
    },
    {
      name: 'New Zealand',
      alpha2Code: 'NZ',
    },
    {
      name: 'Papua New Guinea',
      alpha2Code: 'PG',
    },
  ];

  beforeAll(async () => {
    const testAppModule: TestingModule = await Test.createTestingModule({
      imports: [AppModule, HttpModule, ConfigModule],
      providers: [CountriesApiService, CountriesService],
    }).compile();
    app = testAppModule.createNestApplication();
    httpService = testAppModule.get<HttpService>(HttpService);
    await app.init();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Return countries if API finds countries with search query', async () => {
    const result: AxiosResponse = {
      data,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(result));

    const response = await request(app.getHttpServer())
      .get('/countries/?keywords=new')
      .expect(200);
    expect(response.text).toEqual(JSON.stringify(data));
  });

  it('Return empty array if search query is empty', async () => {
    const result: AxiosResponse = {
      data,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(result));

    const response = await request(app.getHttpServer())
      .get('/countries/?keywords=')
      .expect(200);
    expect(httpService.get).not.toBeCalled();
    expect(response.text).toEqual('[]');
  });

  it("Return empty array if API can't find countries with search query", async () => {
    const result = {
      status: 404,
      response: {
        data: {},
        status: 404,
        statusText: 'Not Found',
        headers: {},
        config: {},
      },
    };
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => throwError(result));

    const response = await request(app.getHttpServer())
      .get('/countries/?keywords=xx')
      .expect(200);
    expect(response.text).toEqual('[]');
  });

  // TODO test for endpoint /countries/[code]
});
