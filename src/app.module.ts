import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { CountriesModule } from './countries/countries.module';
import { TerminusModule } from '@nestjs/terminus';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    CountriesModule,
    TerminusModule,
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot({
      include: [CountriesModule],
      autoSchemaFile: true,
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
