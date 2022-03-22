import { ArgsType, Field, ID, Int } from '@nestjs/graphql';

@ArgsType()
export class GetPopularProductsArgs {
  @Field(() => Int)
  limit: number;
  @Field(() => ID)
  shop_id?: number;
}
