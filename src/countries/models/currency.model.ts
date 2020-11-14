import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Currency {
  @Field()
  code: string;

  @Field()
  name: string;

  @Field()
  symbol: string;
}
