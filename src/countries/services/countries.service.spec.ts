import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule, InternalServerErrorException } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CountriesService } from './countries.service';
import { CountriesApiService } from './countries.api.service';

describe('CountriesService', () => {
  let service: CountriesService;
  let countriesApiService: CountriesApiService;
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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule],
      providers: [CountriesService, CountriesApiService],
    }).compile();

    service = module.get<CountriesService>(CountriesService);
    countriesApiService = module.get<CountriesApiService>(CountriesApiService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('search - return countries if API finds countries with search query', async () => {
    jest
      .spyOn(countriesApiService, 'search')
      .mockImplementationOnce(() => Promise.resolve(data));

    const countries = await service.search('new');
    expect(countries).toEqual(data);
  });

  it('search - return empty array if API returns 404', async () => {
    const error = {
      response: {
        status: 404,
      },
    };

    jest
      .spyOn(countriesApiService, 'search')
      .mockImplementationOnce(() => Promise.reject(error));

    const countries = await service.search('xxx');
    expect(countries).toEqual([]);
  });

  it('search - throw InternalServerErrorException if API returns other errors', async () => {
    const error = {
      response: {
        status: 500,
      },
    };

    jest
      .spyOn(countriesApiService, 'search')
      .mockImplementationOnce(() => Promise.reject(error));
    await expect(service.search('xxx')).rejects.toEqual(
      new InternalServerErrorException('Internal server error'),
    );
  });

  it('search - return empty array if keywords is null or empty string', async () => {
    jest
      .spyOn(countriesApiService, 'search')
      .mockImplementation(() => Promise.resolve(data));

    let countries = await service.search(null);
    expect(countriesApiService.search).not.toBeCalled();
    expect(countries).toEqual([]);

    countries = await service.search('');
    expect(countriesApiService.search).not.toBeCalled();
    expect(countries).toEqual([]);
  });

  // TODO test for findByCode
});
