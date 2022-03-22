import { SortOrder } from 'src/common/dto/generic-conditions.dto';
import { PaginationArgs } from 'src/common/dto/pagination-args.dto';

export class GetCategoriesAlongChildrenDto extends PaginationArgs {
  orderBy?: QueryCategoriesAlongChildrenOrderByColumn;
  sortedBy?: SortOrder;
  hasType?: string;
}

export enum QueryCategoriesAlongChildrenOrderByColumn {
  CREATED_AT = 'CREATED_AT',
  NAME = 'NAME',
  UPDATED_AT = 'UPDATED_AT',
}
