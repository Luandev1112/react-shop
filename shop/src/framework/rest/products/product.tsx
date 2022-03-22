import Popup from '@components/products/details/popup';
import { useProductQuery } from '@framework/products/products.query';

const ProductPopup = ({ productSlug }: { productSlug: string }) => {
  const { data, isLoading: loading } = useProductQuery(productSlug);

  return <Popup product={data!} loading={loading} />;
};

export default ProductPopup;
