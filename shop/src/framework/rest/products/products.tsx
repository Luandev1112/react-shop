import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import ErrorMessage from '@components/ui/error-message';
import { useProductsQuery } from '@framework/products/products.query';
import { Fragment } from 'react';
import GridWithLoader from '@components/products/grids/grid-with-loader';
import useHomepage from '@framework/utils/use-homepage';
const ProductCard = dynamic(() => import('@components/products/cards/card'));
interface ProductsProps {
  shopId?: string;
  layout?: string;
}
const Products: React.FC<ProductsProps> = ({ shopId, layout }) => {
  const { query } = useRouter();
  const { homePage } = useHomepage();

  const group = (query.pages?.[0] as string) ?? (homePage?.slug as string);

  const {
    isFetching: loading,
    isFetchingNextPage: loadingMore,
    fetchNextPage,
    hasNextPage,
    isError,
    data,
    error,
  } = useProductsQuery(
    {
      ...(Boolean(shopId) ? { shop_id: Number(shopId) } : { type: group }),
      text: query?.text as string,
      category: query?.category as string,
    },
    {
      enabled: Boolean(group),
    }
  );

  if (isError && error) return <ErrorMessage message={error.message} />;
  function handleLoadMore() {
    fetchNextPage();
  }

  return (
    <GridWithLoader
      notFound={!loading && !data?.pages?.[0]?.data?.length}
      showLoaders={loading && !data?.pages?.length}
      hasNextPage={Boolean(hasNextPage)}
      isLoadingMore={loadingMore}
      onLoadMore={handleLoadMore}
      layout={layout}
    >
      {data?.pages?.map((products, idx: number) => (
        <Fragment key={idx}>
          {products?.data?.map((product) => (
            <div key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </Fragment>
      ))}
    </GridWithLoader>
  );
};

export default Products;
