import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { OrdersService } from './orders.service';
import { Order } from './entities/order.entity';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { GetOrdersArgs, OrderPaginator } from './dto/get-orders.args';
import {
  CheckoutVerificationInput,
  VerifiedCheckoutData,
} from './dto/verify-checkout.input';
import { OrderStatus } from './entities/order-status.entity';
import {
  GetOrderStatusesArgs,
  OrderStatusPaginator,
} from './dto/get-order-statuses.args';
import { GetOrderArgs } from './dto/get-order.args';
import {
  CreateOrderStatusInput,
  UpdateOrderStatusInput,
} from './dto/create-order-status.input';

@Resolver(() => Order)
export class OrdersResolver {
  constructor(private readonly ordersService: OrdersService) {}

  @Mutation(() => Order)
  createOrder(@Args('input') createOrderInput: CreateOrderInput) {
    return this.ordersService.create(createOrderInput);
  }

  @Query(() => OrderPaginator, { name: 'orders' })
  getOrders(@Args() ordersArgs: GetOrdersArgs) {
    return this.ordersService.getOrders(ordersArgs);
  }
  @Query(() => OrderStatusPaginator, { name: 'orderStatuses' })
  getOrderStatuses(@Args() orderStatusesArgs: GetOrderStatusesArgs) {
    return this.ordersService.getOrderStatuses(orderStatusesArgs);
  }

  @Query(() => Order, { name: 'order' })
  findOne(@Args() orderArgs: GetOrderArgs) {
    return this.ordersService.getOrder(orderArgs);
  }
  @Query(() => OrderStatus, { name: 'orderStatus' })
  getOrderStatus(@Args('id', { type: () => ID }) id: number) {
    return this.ordersService.getOrderStatus(id);
  }

  @Mutation(() => Order)
  updateOrder(@Args('input') updateOrderInput: UpdateOrderInput) {
    return this.ordersService.update(updateOrderInput.id, updateOrderInput);
  }

  @Mutation(() => Order)
  deleteOrder(@Args('id', { type: () => ID }) id: number) {
    return this.ordersService.remove(id);
  }
  @Mutation(() => VerifiedCheckoutData)
  verifyCheckout(
    @Args('input') checkoutVerificationInput: CheckoutVerificationInput,
  ): VerifiedCheckoutData {
    return this.ordersService.verifyCheckout(checkoutVerificationInput);
  }

  @Mutation(() => OrderStatus)
  createOrderStatus(
    @Args('input') createOrderStatusInput: CreateOrderStatusInput,
  ) {
    return this.ordersService.createOrderStatus(createOrderStatusInput);
  }
  @Mutation(() => OrderStatus)
  updateOrderStatus(
    @Args('input') updateOrderStatusInput: UpdateOrderStatusInput,
  ) {
    return this.ordersService.updateOrderStatus(updateOrderStatusInput);
  }

  @Mutation(() => OrderStatus)
  deleteOrderStatus(@Args('id', { type: () => ID }) id: number) {
    return this.ordersService.remove(id);
  }
}
