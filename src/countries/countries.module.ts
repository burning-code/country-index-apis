import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CountriesController } from './countries.controller';
import { CountriesService } from './services/countries.service';
import { CountriesApiService } from './services/countries.api.service';
import { CountriesResolver } from './countries.resolver';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [CountriesController],
  providers: [CountriesService, CountriesApiService, CountriesResolver],
})
export class CountriesModule {}
