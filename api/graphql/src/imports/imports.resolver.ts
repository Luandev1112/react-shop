import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { ImportsService } from './imports.service';

import { ImportInput } from './dto/create-import.input';

@Resolver()
export class ImportsResolver {
  constructor(private readonly importsService: ImportsService) {}

  @Mutation(() => Boolean)
  importAttributes(@Args('input') importAttributesInput: ImportInput) {
    console.log(importAttributesInput);
    return true;
  }
  @Mutation(() => Boolean)
  importProducts(@Args('input') importProductsInput: ImportInput) {
    console.log(importProductsInput);
    return true;
  }
  @Mutation(() => Boolean)
  importVariationOptions(
    @Args('input') importVariationOptionsInput: ImportInput,
  ) {
    console.log(importVariationOptionsInput);
    return true;
  }
}
