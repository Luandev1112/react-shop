import {
  ArgsType,
  Field,
  ID,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import {
  SortOrder,
  WhereHasConditions,
  WhereHasConditionsRelation,
} from 'src/common/dto/generic-conditions.input';
import { PaginationArgs } from 'src/common/dto/pagination.args';
import { PaginatorInfo } from 'src/common/dto/paginator-info.model';
import { Product } from '../entities/product.entity';
//TODO: should make a generic type for paginator
@ObjectType()
export class ProductPaginator {
  data: Product[];
  paginatorInfo: PaginatorInfo;
}

@ArgsType()
export class GetProductsArgs extends PaginationArgs {
  orderBy?: QueryProductsOrderByOrderByClause[];
  text?: string;
  status?: string;
  @Field(() => ID)
  shop_id?: number;
  hasType?: QueryProductsHasTypeWhereHasConditions;
  hasCategories?: QueryProductsHasCategoriesWhereHasConditions;
}

@InputType()
export class QueryProductsOrderByOrderByClause {
  column: QueryProductsOrderByColumn;
  order: SortOrder;
}
@InputType()
export class QueryProductsHasTypeWhereHasConditions extends WhereHasConditions {
  column: QueryProductsHasTypeColumn;
  AND?: QueryProductsHasTypeWhereHasConditions[];
  OR?: QueryProductsHasTypeWhereHasConditions[];
  HAS?: QueryProductsHasTypeWhereHasConditionsRelation;
}
@InputType()
export class QueryProductsHasCategoriesWhereHasConditions extends WhereHasConditions {
  column: QueryProductsHasCategoriesColumn;
  AND?: QueryProductsHasCategoriesWhereHasConditions[];
  OR?: QueryProductsHasCategoriesWhereHasConditions[];
  HAS?: QueryProductsHasCategoriesWhereHasConditionsRelation;
}
@InputType()
export class QueryProductsHasTypeWhereHasConditionsRelation extends WhereHasConditionsRelation {
  condition: QueryProductsHasTypeWhereHasConditions;
}
@InputType()
export class QueryProductsHasCategoriesWhereHasConditionsRelation extends WhereHasConditionsRelation {
  condition: QueryProductsHasCategoriesWhereHasConditions;
}

export enum QueryProductsOrderByColumn {
  CREATED_AT = 'CREATED_AT',
  NAME = 'NAME',
  UPDATED_AT = 'UPDATED_AT',
}

registerEnumType(QueryProductsOrderByColumn, {
  name: 'QueryProductsOrderByColumn',
});

export enum QueryProductsHasTypeColumn {
  SLUG = 'SLUG',
}

registerEnumType(QueryProductsHasTypeColumn, {
  name: 'QueryProductsHasTypeColumn',
});
export enum QueryProductsHasCategoriesColumn {
  SLUG = 'SLUG',
}

registerEnumType(QueryProductsHasCategoriesColumn, {
  name: 'QueryProductsHasCategoriesColumn',
});
