import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { GetOrdersDto, OrderPaginator } from './dto/get-orders.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import ordersJson from './orders.json';
import orderStatusJson from './order-statuses.json';
import { plainToClass } from 'class-transformer';
import { Order } from './entities/order.entity';
import { OrderStatus } from './entities/order-status.entity';
import { paginate } from 'src/common/pagination/paginate';
import {
  GetOrderStatusesDto,
  OrderStatusPaginator,
} from './dto/get-order-statuses.dto';
import {
  CheckoutVerificationDto,
  VerifiedCheckoutData,
} from './dto/verify-checkout.dto';
import {
  CreateOrderStatusDto,
  UpdateOrderStatusDto,
} from './dto/create-order-status.dto';
const orders = plainToClass(Order, ordersJson);
const orderStatus = plainToClass(OrderStatus, orderStatusJson);
@Injectable()
export class OrdersService {
  private orders: Order[] = orders;
  private orderStatus: OrderStatus[] = orderStatus;
  create(createOrderInput: CreateOrderDto) {
    return this.orders[0];
  }

  getOrders({
    limit,
    page,
    customer_id,
    tracking_number,
    search,
    shop_id,
  }: GetOrdersDto): OrderPaginator {
    if (!page) page = 1;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    let data: Order[] = this.orders;

    if (shop_id && shop_id !== 'undefined') {
      data = this.orders?.filter((p) => p?.shop?.id === Number(shop_id));
    }
    const results = data.slice(startIndex, endIndex);
    const url = `/orders?search=${search}&limit=${limit}`;
    return {
      data: results,
      ...paginate(data.length, page, limit, results.length, url),
    };
  }

  getOrderById(id: number): Order {
    return this.orders.find((p) => p.id === Number(id));
  }
  getOrderByTrackingNumber(tracking_number: string): Order {
    const parentOrder = this.orders.find(
      (p) => p.tracking_number === tracking_number,
    );
    if (!parentOrder) {
      return this.orders[0];
    }
    return parentOrder;
  }
  getOrderStatuses({
    limit,
    page,
    search,
    orderBy,
  }: GetOrderStatusesDto): OrderStatusPaginator {
    if (!page || page.toString() === 'undefined') page = 1;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const data: OrderStatus[] = this.orderStatus;

    // if (shop_id) {
    //   data = this.orders?.filter((p) => p?.shop?.id === shop_id);
    // }
    const results = data.slice(startIndex, endIndex);
    const url = `/order-status?search=${search}&limit=${limit}`;

    return {
      data: results,
      ...paginate(data.length, page, limit, results.length, url),
    };
  }
  getOrderStatus(slug: string) {
    return this.orderStatus.find((p) => p.name === slug);
  }
  update(id: number, updateOrderInput: UpdateOrderDto) {
    return this.orders[0];
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
  verifyCheckout(input: CheckoutVerificationDto): VerifiedCheckoutData {
    return {
      total_tax: 0,
      shipping_charge: 0,
      unavailable_products: [],
    };
  }
  createOrderStatus(createOrderStatusInput: CreateOrderStatusDto) {
    return this.orderStatus[0];
  }
  updateOrderStatus(updateOrderStatusInput: UpdateOrderStatusDto) {
    return this.orderStatus[0];
  }
}
