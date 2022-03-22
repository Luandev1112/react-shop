import { Field, InputType, Int, registerEnumType } from '@nestjs/graphql';
// import { Mixed } from '../scalars/mixed.scalar';

export enum SQLOperator {
  EQ = 'EQ',
  NEQ = 'NEQ',
  GT = 'GT',
}

registerEnumType(SQLOperator, {
  name: 'SQLOperator',
});

@InputType()
export class WhereHasConditions {
  @Field(() => SQLOperator, { defaultValue: SQLOperator.EQ })
  operator = SQLOperator.EQ;
  value: string;
}

@InputType()
export class WhereHasConditionsRelation {
  relation: string;
  operator: SQLOperator;
  @Field(() => Int)
  amount = 1;
}

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

registerEnumType(SortOrder, {
  name: 'SortOrder',
});
