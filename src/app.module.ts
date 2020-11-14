import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { CountriesModule } from './countries/countries.module';
import { TerminusModule } from '@nestjs/terminus';

@Module({
  imports: [
    CountriesModule,
    TerminusModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
})
export class AppModule {}
