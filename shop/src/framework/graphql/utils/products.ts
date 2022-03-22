import {
  Maybe,
  ProductStatus,
  QueryCategoriesHasTypeColumn,
  QueryProductsHasTypeColumn,
  QueryProductsOrderByColumn,
  SortOrder,
  SqlOperator,
} from '__generated__/__types__';
export interface IGetProducts {
  type?: Maybe<string>;
  limit: number;
  text?: string;
  shopId?: number;
  category?: string;
  page?: number;
  status?: ProductStatus;
  orderField?: QueryProductsOrderByColumn;
  sortOrder?: SortOrder;
}

export const getProducts = ({
  type,
  limit,
  text,
  category,
  shopId,
  page = 1,
  status = ProductStatus.Publish,
  orderField = QueryProductsOrderByColumn.CreatedAt,
  sortOrder = SortOrder.Asc,
}: IGetProducts) => {
  return {
    ...(type && {
      hasType: {
        column: QueryProductsHasTypeColumn.Slug,
        operator: SqlOperator.Eq,
        value: type,
      },
    }),
    ...(shopId && { shop_id: shopId }),
    ...(text && { text: `%${text}%` }),
    ...(category && {
      hasCategories: {
        column: QueryCategoriesHasTypeColumn.Slug,
        operator: SqlOperator.Eq,
        value: category ?? null,
      },
    }),
    ...(orderField && { orderBy: [{ column: orderField, order: sortOrder }] }),
    page,
    status,
    first: limit,
  };
};
