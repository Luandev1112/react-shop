import { SettingsDocument } from '@framework/app/settings.graphql';
import { ProductsDocument } from '@framework/products/products.graphql';
import { addApolloState, initializeApollo } from '@framework/utils/apollo';
import { GetStaticPathsContext, GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ShopDocument, ShopsDocument } from '@framework/shops/shops.graphql';
import { getProducts } from '@framework/utils/products';

// This function gets called at build time
export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query({
    query: ShopsDocument,
    variables: {
      first: 100,
      is_active: true,
    },
  });
  const paths = data?.shops?.data?.flatMap((shop: any) =>
    locales?.map((locale) => ({ params: { slug: shop.slug }, locale }))
  );

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: 'blocking' };
}
// This also gets called at build time
export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const apolloClient = initializeApollo();
  await apolloClient.query({
    query: SettingsDocument,
  });
  const { data } = await apolloClient.query({
    query: ShopDocument,
    variables: {
      slug: params!.slug,
    },
  });
  await apolloClient.query({
    query: ProductsDocument,
    variables: getProducts({
      shopId: Number(data?.shop?.id),
      limit: 30,
    }),
  });
  if (!data?.shop) {
    return {
      notFound: true,
    };
  }
  return addApolloState(apolloClient, {
    props: {
      data,
      ...(await serverSideTranslations(locale!, ['common'])),
    },
    revalidate: 120,
  });
};
