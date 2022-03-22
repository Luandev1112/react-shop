import { useEffect } from 'react';
import dayjs from 'dayjs';
import Link from '@components/ui/link';
import usePrice from '@lib/use-price';
import { formatAddress } from '@lib/format-address';
import { formatString } from '@lib/format-string';
import { ROUTES } from '@lib/routes';
import { useTranslation } from 'next-i18next';
import { useCart } from '@store/quick-cart/cart.context';
import { CheckMark } from '@components/icons/checkmark';
import Badge from '@components/ui/badge';
import { OrderItems } from '@components/orders/order-items';
import { useAtom } from 'jotai';
import { clearCheckoutAtom } from '@store/checkout';
import SuborderItems from '@components/orders/suborder-items';

export default function OrderView({ order }: any) {
  const { t } = useTranslation('common');
  const { resetCart } = useCart();
  const [, resetCheckout] = useAtom(clearCheckoutAtom);

  useEffect(() => {
    resetCart();
    resetCheckout();
  }, [resetCart, resetCheckout]);

  const { price: total } = usePrice({ amount: order?.paid_total! });
  const { price: sub_total } = usePrice({ amount: order?.amount! });
  const { price: shipping_charge } = usePrice({
    amount: order?.delivery_fee ?? 0,
  });
  const { price: tax } = usePrice({ amount: order?.sales_tax ?? 0 });
  const { price: discount } = usePrice({ amount: order?.discount ?? 0 });

  return (
    <div className="p-4 sm:p-8">
      <div className="p-6 sm:p-8 lg:p-12 max-w-screen-lg w-full mx-auto bg-light rounded border shadow-sm">
        <h2 className="flex flex-col sm:flex-row items-center justify-between text-base font-bold text-heading mb-9 sm:mb-12">
          <span className="mt-5 sm:mt-0 me-auto order-2 sm:order-1">
            <span className="me-4">{t('text-status')} :</span>
            <Badge
              text={order?.status?.name!}
              className="font-normal text-sm whitespace-nowrap"
            />
          </span>
          <Link
            href={ROUTES.HOME}
            className="inline-flex items-center order-1 sm:order-2 text-accent text-base font-normal underline hover:no-underline hover:text-accent-hover"
          >
            {t('text-back-to-home')}
          </Link>
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-12">
          <div className="py-4 px-5 border border-border-200 rounded shadow-sm">
            <h3 className="mb-2 text-sm text-heading font-semibold">
              {t('text-order-number')}
            </h3>
            <p className="text-sm  text-body-dark">{order?.tracking_number}</p>
          </div>
          <div className="py-4 px-5 border border-border-200 rounded shadow-sm">
            <h3 className="mb-2 text-sm  text-heading font-semibold">
              {t('text-date')}
            </h3>
            <p className="text-sm text-body-dark">
              {dayjs(order?.created_at).format('MMMM D, YYYY')}
            </p>
          </div>
          <div className="py-4 px-5 border border-border-200 rounded shadow-sm">
            <h3 className="mb-2 text-sm  text-heading font-semibold">
              {t('text-total')}
            </h3>
            <p className="text-sm  text-body-dark">{total}</p>
          </div>
          <div className="py-4 px-5 border border-border-200 rounded shadow-sm">
            <h3 className="mb-2 text-sm  text-heading font-semibold">
              {t('text-payment-method')}
            </h3>
            <p className="text-sm text-body-dark">
              {order?.payment_gateway ?? 'N/A'}
            </p>
          </div>
        </div>
        {/* end of order received  */}

        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 lg:pe-3 mb-12 lg:mb-0">
            <h2 className="text-xl font-bold text-heading mb-6">
              {t('text-total-amount')}
            </h2>
            <div>
              <p className="flex text-body-dark mt-5">
                <strong className="w-5/12 sm:w-4/12 text-sm  text-heading font-semibold">
                  {t('text-sub-total')}
                </strong>
                :
                <span className="w-7/12 sm:w-8/12 ps-4 text-sm ">
                  {sub_total}
                </span>
              </p>
              <p className="flex text-body-dark mt-5">
                <strong className="w-5/12 sm:w-4/12 text-sm  text-heading font-semibold">
                  {t('text-shipping-charge')}
                </strong>
                :
                <span className="w-7/12 sm:w-8/12 ps-4 text-sm ">
                  {shipping_charge}
                </span>
              </p>
              <p className="flex text-body-dark mt-5">
                <strong className="w-5/12 sm:w-4/12 text-sm  text-heading font-semibold">
                  {t('text-tax')}
                </strong>
                :<span className="w-7/12 sm:w-8/12 ps-4 text-sm ">{tax}</span>
              </p>
              <p className="flex text-body-dark mt-5">
                <strong className="w-5/12 sm:w-4/12 text-sm  text-heading font-semibold">
                  {t('text-discount')}
                </strong>
                :
                <span className="w-7/12 sm:w-8/12 ps-4 text-sm ">
                  {discount}
                </span>
              </p>
              <p className="flex text-body-dark mt-5">
                <strong className="w-5/12 sm:w-4/12 text-sm  text-heading font-semibold">
                  {t('text-total')}
                </strong>
                :<span className="w-7/12 sm:w-8/12 ps-4 text-sm">{total}</span>
              </p>
            </div>
          </div>
          {/* end of total amount */}

          <div className="w-full lg:w-1/2 lg:ps-3">
            <h2 className="text-xl font-bold text-heading mb-6">
              {t('text-order-details')}
            </h2>
            <div>
              <p className="flex text-body-dark mt-5">
                <strong className="w-4/12 text-sm  text-heading font-semibold">
                  {t('text-total-item')}
                </strong>
                :
                <span className="w-8/12 ps-4 text-sm ">
                  {formatString(order?.products?.length, t('text-item'))}
                </span>
              </p>
              <p className="flex text-body-dark mt-5">
                <strong className="w-4/12 text-sm  text-heading font-semibold">
                  {t('text-deliver-time')}
                </strong>
                :
                <span className="w-8/12 ps-4 text-sm ">
                  {order?.delivery_time}
                </span>
              </p>
              <p className="flex text-body-dark mt-5">
                <strong className="w-4/12 text-sm text-heading font-semibold">
                  {t('text-shipping-address')}
                </strong>
                :
                <span className="w-8/12 ps-4 text-sm ">
                  {formatAddress(order?.shipping_address!)}
                </span>
              </p>
            </div>
          </div>
          {/* end of order details */}
        </div>
        <div className="mt-12">
          <OrderItems products={order?.products} />
        </div>
        {order?.children?.length ? (
          <div>
            <h2 className="text-xl font-bold text-heading mt-12 mb-6">
              {t('text-sub-orders')}
            </h2>
            <div>
              <div className="flex items-start border border-gray-700 rounded p-4 mb-12">
                <span className="w-4 h-4 px-2 rounded-sm bg-dark flex items-center justify-center me-3 mt-0.5">
                  <CheckMark className="w-2 h-2 text-light flex-shrink-0" />
                </span>
                <p className="text-heading text-sm">
                  <span className="font-bold">{t('text-note')}:</span>{' '}
                  {t('message-sub-order')}
                </p>
              </div>
              {Array.isArray(order?.children) && order?.children.length && (
                <div className="">
                  <SuborderItems items={order?.children} />
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
