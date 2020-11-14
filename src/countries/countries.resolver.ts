import { Args, Query, Resolver } from '@nestjs/graphql';
import { Country } from './models/country.model';
import { CountriesService } from './services/countries.service';

@Resolver()
export class CountriesResolver {
  constructor(private countriesService: CountriesService) {}

  @Query((returns) => [Country], { name: 'countries' })
  async searchCountries(@Args('keywords') keywords: string) {
    return await this.countriesService.search(keywords);
  }

  @Query((returns) => Country, { name: 'country' })
  async getCountry(@Args('code') code: string) {
    return await this.countriesService.findByCode(code);
  }
}
