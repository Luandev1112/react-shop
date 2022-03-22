import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import ErrorMessage from '@components/ui/error-message';
import GridWithLoader from '@components/products/grids/grid-with-loader';
import { useProductsQuery } from '@framework/products/products.graphql';
import { NetworkStatus } from '@apollo/client';
import { getProducts } from '@framework/utils/products';
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
  const { data, loading, error, fetchMore, networkStatus } = useProductsQuery({
    // skip: !Boolean(group),
    // @ts-ignore
    variables: getProducts({
      ...(Boolean(shopId) ? { shopId: Number(shopId) } : { type: group }),
      text: query?.text as string,
      category: query?.category as string,
      limit: 30,
    }),
    notifyOnNetworkStatusChange: true,
  });

  if (error) return <ErrorMessage message={error.message} />;
  const loadingMore = networkStatus === NetworkStatus.fetchMore;
  function handleLoadMore() {
    if (data?.products?.paginatorInfo.hasMorePages) {
      fetchMore({
        variables: {
          page: data?.products?.paginatorInfo?.currentPage + 1,
          first: 30,
        },
      });
    }
  }
  return (
    <GridWithLoader
      notFound={!loading && !data?.products?.data?.length}
      showLoaders={loading && !data?.products?.data.length}
      hasNextPage={Boolean(data?.products?.paginatorInfo?.hasMorePages)}
      isLoadingMore={loadingMore}
      onLoadMore={handleLoadMore}
      layout={layout}
    >
      {data?.products?.data?.map((product) => (
        <div key={product.id}>
          <ProductCard product={product} />
        </div>
      ))}
    </GridWithLoader>
  );
};

export default Products;
