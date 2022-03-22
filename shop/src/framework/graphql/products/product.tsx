import Popup from '@components/products/details/popup';
import { useProductQuery } from '@framework/products/products.graphql';

const ProductPopup = ({ productSlug }: { productSlug: string }) => {
  const { data, loading } = useProductQuery({
    variables: {
      slug: productSlug,
    },
  });

  return <Popup product={data?.product} loading={loading} />;
};

export default ProductPopup;
