import {
  ObjectType,
  Field,
  Int,
  registerEnumType,
  ID,
  InputType,
} from '@nestjs/graphql';
import { AttributeValue } from 'src/attributes/entities/attribute-value.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Attachment } from 'src/common/entities/attachment.entity';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Shop } from 'src/shops/entities/shop.entity';
import { Tag } from 'src/tags/entities/tag.entity';
import { Type } from 'src/types/entities/type.entity';
import { Type as TypeTransformer } from 'class-transformer';
enum ProductStatus {
  PUBLISH = 'publish',
  DRAFT = 'draft',
}
enum ProductType {
  SIMPLE = 'simple',
  VARIABLE = 'variable',
}
registerEnumType(ProductStatus, { name: 'ProductStatus' });
registerEnumType(ProductType, { name: 'ProductType' });

@InputType('ProductInputType', { isAbstract: true })
@ObjectType()
export class Product extends CoreEntity {
  name: string;
  slug: string;
  type: Type;
  @Field(() => Int)
  type_id: number;
  product_type: ProductType;
  categories: Category[];
  tags?: Tag[];
  variations?: AttributeValue[];
  variation_options?: Variation[];
  pivot?: OrderProductPivot;
  orders?: Order[];
  @TypeTransformer(() => Shop)
  shop: Shop;
  @Field(() => Int)
  shop_id: number;
  related_products?: Product[];
  description: string;
  in_stock: boolean;
  is_taxable: boolean;
  sale_price?: number;
  max_price?: number;
  min_price?: number;
  sku?: string;
  gallery?: Attachment[];
  image?: Attachment;
  status: ProductStatus;
  height?: string;
  length?: string;
  width?: string;
  price?: number;
  @Field(() => Int)
  quantity: number;
  unit: string;
}

@InputType('PivotInputType', { isAbstract: true })
@ObjectType()
export class OrderProductPivot {
  @Field(() => ID)
  variation_option_id?: number;
  @Field(() => Int)
  order_quantity: number;
  unit_price: number;
  subtotal: number;
}

@InputType('VariationInputType', { isAbstract: true })
@ObjectType()
export class Variation {
  @Field(() => ID)
  id: number;
  title: string;
  price: number;
  sku: string;
  is_disable: boolean;
  sale_price?: number;
  @Field(() => Int)
  quantity: number;
  options: VariationOption[];
}
@InputType()
export class VariationInput extends Variation {}
@InputType('VariationOptionInputType', { isAbstract: true })
@ObjectType()
export class VariationOption {
  name: string;
  value: string;
}
