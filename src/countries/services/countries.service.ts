import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Country } from '../models/country.model';
import { CountriesApiService } from './countries.api.service';

@Injectable()
export class CountriesService {
  constructor(private countriesApiService: CountriesApiService) {}

  async search(keywords: string): Promise<Country[]> {
    if (!keywords) {
      return [];
    }
    try {
      return await this.countriesApiService.search(keywords);
    } catch (e) {
      switch (e.response.status) {
        case HttpStatus.NOT_FOUND:
          return [];
        default:
          throw new InternalServerErrorException(`Internal server error`);
      }
    }
  }

  async findByCode(code: string): Promise<Country> {
    const regex = RegExp(/^[A-Za-z]{2}[A-Za-z]?$/gi);
    if (!regex.test(code)) {
      throw new BadRequestException(`Invalid country code format: [${code}]`);
    }

    try {
      return await this.countriesApiService.findByCode(code);
    } catch (e) {
      switch (e.response.status) {
        case HttpStatus.NOT_FOUND:
          throw new NotFoundException(
            `Can't find country with code: [${code}]`,
          );
        default:
          throw new InternalServerErrorException(`Internal server error`);
      }
    }
  }
}
