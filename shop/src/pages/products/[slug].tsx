import { getLayout } from '@components/layouts/layout';
import { AttributesProvider } from '@components/products/details/attributes.context';
import Details from '@components/products/details/details';
import { useWindowSize } from '@lib/use-window-size';
import dynamic from 'next/dynamic';

export { getStaticPaths, getStaticProps } from '@framework/ssr/product';

const RelatedProducts = dynamic(
  () => import('@components/products/details/related-products')
);
const CartCounterButton = dynamic(
  () => import('@components/cart/cart-counter-button'),
  { ssr: false }
);

export default function Product({ product }: any) {
  const { width } = useWindowSize();

  return (
    <AttributesProvider>
      <div className="bg-light min-h-screen">
        <Details product={product} />
        {product?.related_products?.length > 1 && (
          <div className="p-5 lg:p-14 xl:p-16">
            <RelatedProducts
              products={product?.related_products}
              currentProductId={product?.id}
              gridClassName="lg:grid-cols-4 2xl:grid-cols-5 !gap-3"
            />
          </div>
        )}
      </div>
      {width > 1023 && <CartCounterButton />}
    </AttributesProvider>
  );
}
Product.getLayout = getLayout;
