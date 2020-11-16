import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Currency } from './currency.model';
import { Language } from './language.model';

@ObjectType()
export class Country {
  @Field()
  name: string;

  @Field()
  alpha2Code: string;

  @Field({ nullable: true })
  alpha3Code?: string;

  @Field((type) => [String], { nullable: 'items' })
  callingCodes?: string[];

  @Field({ nullable: true })
  capital?: string;

  @Field((type) => [String], { nullable: 'items' })
  altSpellings?: string[];

  @Field({ nullable: true })
  region?: string;

  @Field({ nullable: true })
  subregion?: string;

  @Field((type) => Int, { nullable: true })
  population?: number;

  @Field((type) => [Float], { nullable: 'items' })
  latlng?: number[];

  @Field({ nullable: true })
  demonym?: string;

  @Field((type) => Int, { nullable: true })
  area?: number;

  @Field((type) => Float, { nullable: true })
  gini?: number;

  @Field((type) => [String], { nullable: 'items' })
  timezones?: string[];

  @Field({ nullable: true })
  nativeName?: string;

  @Field((type) => [Currency], { nullable: 'items' })
  currencies?: Currency[];

  @Field((type) => [Language], { nullable: 'items' })
  languages?: Language[];

  @Field({ nullable: true })
  flag?: string;

  @Field({ nullable: true })
  cioc?: string;
}
