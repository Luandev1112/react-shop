import { Image } from '@components/ui/image';
import { useWindowSize } from '@lib/use-window-size';
import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import ShopSidebar from '@components/shops/sidebar';
export { getStaticPaths, getStaticProps } from '@framework/ssr/shop';
import { productPlaceholder } from '@lib/placeholders';
import Products from '@framework/products/products';
import { getLayout } from '@components/layouts/layout';

const CartCounterButton = dynamic(
  () => import('@components/cart/cart-counter-button'),
  { ssr: false }
);

export default function ShopPage({ data }: any) {
  const { width } = useWindowSize();
  const { t } = useTranslation('banner');

  return (
    <div className="bg-gray-100 flex flex-col lg:flex-row lg:items-start lg:p-8">
      <ShopSidebar data={data} className="sticky top-24 lg:top-28" />

      <div className="flex flex-col w-full p-4 lg:p-0 lg:ps-8">
        <div className="relative rounded w-full overflow-hidden h-full">
          <Image
            alt={t('heading')}
            src={data?.shop?.cover_image?.original! ?? productPlaceholder}
            layout="responsive"
            width={2340}
            height={870}
            className="w-full h-full"
          />
        </div>
        {data?.shop && <Products shopId={data?.shop.id!} layout="shop" />}
      </div>
      {width > 1023 && <CartCounterButton />}
    </div>
  );
}

ShopPage.getLayout = getLayout;
