import { ArgsType, InputType, registerEnumType } from '@nestjs/graphql';
import {
  SortOrder,
  WhereHasConditions,
  WhereHasConditionsRelation,
} from 'src/common/dto/generic-conditions.input';

@ArgsType()
export class GetCategoriesAlongChildrenArgs {
  orderBy?: QueryCategoriesAlongChildrenOrderByOrderByClause[];
  hasType?: QueryCategoriesAlongChildrenHasTypeWhereHasConditions;
}
@InputType()
export class QueryCategoriesAlongChildrenOrderByOrderByClause {
  column: QueryCategoriesAlongChildrenOrderByColumn;
  order: SortOrder;
}
@InputType()
export class QueryCategoriesAlongChildrenHasTypeWhereHasConditions extends WhereHasConditions {
  column: QueryCategoriesAlongChildrenHasTypeColumn;
  AND?: QueryCategoriesAlongChildrenHasTypeWhereHasConditions[];
  OR?: QueryCategoriesAlongChildrenHasTypeWhereHasConditions[];
  HAS?: QueryCategoriesAlongChildrenHasTypeWhereHasConditionsRelation;
}
@InputType()
export class QueryCategoriesAlongChildrenHasTypeWhereHasConditionsRelation extends WhereHasConditionsRelation {
  condition: QueryCategoriesAlongChildrenHasTypeWhereHasConditions;
}

export enum QueryCategoriesAlongChildrenOrderByColumn {
  CREATED_AT = 'CREATED_AT',
  NAME = 'NAME',
  UPDATED_AT = 'UPDATED_AT',
}

registerEnumType(QueryCategoriesAlongChildrenOrderByColumn, {
  name: 'QueryCategoriesAlongChildrenOrderByColumn',
});

export enum QueryCategoriesAlongChildrenHasTypeColumn {
  SLUG = 'SLUG',
}

registerEnumType(QueryCategoriesAlongChildrenHasTypeColumn, {
  name: 'QueryCategoriesAlongChildrenHasTypeColumn',
});
