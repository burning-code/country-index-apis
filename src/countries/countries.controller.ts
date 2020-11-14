import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { CountriesService } from './services/countries.service';
import { Country } from './interfaces/country.interface';

@Controller('countries')
export class CountriesController {
  constructor(private countriesService: CountriesService) {}

  @Get()
  async search(@Query() query): Promise<Country[]> {
    return await this.countriesService.search(query.keywords);
  }

  @Get(':code')
  async findByName(@Param('code') code): Promise<Country> {
    return await this.countriesService.findByCode(code);
  }
}
