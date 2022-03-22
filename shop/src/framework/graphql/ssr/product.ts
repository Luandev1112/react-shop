import { GetStaticPathsContext, GetStaticProps } from 'next';
import { SettingsDocument } from '@framework/app/settings.graphql';
import {
  ProductDocument,
  ProductsDocument,
} from '@framework/products/products.graphql';
import { addApolloState, initializeApollo } from '@framework/utils/apollo';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// This function gets called at build time
export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query({
    query: ProductsDocument,
    variables: {
      first: 100,
    },
  });
  const paths = data?.products?.data?.flatMap((product: any) =>
    locales?.map((locale) => ({ params: { slug: product.slug }, locale }))
  );
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: 'blocking' };
}
// This also gets called at build time
export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const apolloClient = initializeApollo();
  const { slug } = params as any;
  await apolloClient.query({
    query: SettingsDocument,
  });
  const {
    data: { product },
  } = await apolloClient.query({
    query: ProductDocument,
    variables: { slug },
  });

  if (!product) {
    return {
      notFound: true,
    };
  }
  return addApolloState(apolloClient, {
    props: {
      product,
      ...(await serverSideTranslations(locale!, ['common'])),
    },
    revalidate: 60,
  });
};
