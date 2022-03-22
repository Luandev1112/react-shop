import Spinner from '@components/ui/loaders/spinner/spinner';
import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import { Product } from '@framework/types';
import Details from './details';
import ShortDetails from './short-details';
import { stickyShortDetailsAtom } from '@store/sticky-short-details-atom';
import { useAtom } from 'jotai';
import { AttributesProvider } from './attributes.context';

const RelatedProducts = dynamic(() => import('./related-products'));
interface ProductPopupProps {
  product: Product;
  loading: boolean;
}
const Popup: React.FC<ProductPopupProps> = ({ product, loading }) => {
  const { t } = useTranslation('common');
  const [showStickyShortDetails] = useAtom(stickyShortDetailsAtom);

  const { id, related_products } = product ?? {};

  if (loading || !product)
    return (
      <div className="w-96 flex justify-center items-center h-96 bg-light relative">
        <Spinner text={t('common:text-loading')} />
      </div>
    );

  return (
    <AttributesProvider>
      <article className="bg-light w-full max-w-6xl xl:min-w-[1152px] relative z-[51] md:rounded-xl">
        {/* Sticky bar */}
        <ShortDetails product={product} isSticky={showStickyShortDetails} />
        {/* End of sticky bar */}
        <Details product={product} backBtn={false} isModal={true} />

        {related_products?.length! > 1 && (
          <div className="p-5 md:pb-10 lg:p-14 xl:p-16">
            <RelatedProducts
              products={related_products}
              currentProductId={id}
            />
          </div>
        )}
      </article>
    </AttributesProvider>
  );
};

export default Popup;
