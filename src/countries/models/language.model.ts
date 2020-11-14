import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Language {
  @Field()
  iso639_1: string;

  @Field()
  iso639_2: string;

  @Field()
  name: string;

  @Field()
  nativeName: string;
}
