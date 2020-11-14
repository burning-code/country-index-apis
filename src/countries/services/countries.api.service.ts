import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Country } from '../interfaces/country.interface';

@Injectable()
export class CountriesApiService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async search(keywords: string): Promise<Country[]> {
    const response = await this.httpService
      .get(
        `${this.configService.get<string>(
          'RESTCOUNTRIES_ENDPOINT',
        )}/name/${keywords}?fields=name;alpha2Code`,
      )
      .toPromise();

    return response.data;
  }

  async findByCode(code: string): Promise<Country> {
    const response = await this.httpService
      .get(
        `${this.configService.get<string>(
          'RESTCOUNTRIES_ENDPOINT',
        )}/alpha/${code}`,
      )
      .toPromise();

    return response.data;
  }
}
