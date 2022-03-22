import { addApolloState, initializeApollo } from '@framework/utils/apollo';
import { GetStaticPathsContext, GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import {
  GroupDocument,
  GroupsDocument,
} from '@framework/groups/groups.graphql';
import { SettingsDocument } from '@framework/app/settings.graphql';
import { ProductsDocument } from '@framework/products/products.graphql';
import { CategoriesDocument } from '@framework/categories/categories.graphql';
import { getProducts } from '@framework/utils/products';
import { getCategories } from '@framework/utils/categories';
// This function gets called at build time
export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  const apolloClient = initializeApollo();
  // array of type
  const { data } = await apolloClient.query({
    query: GroupsDocument,
  });
  // Get the paths we want to pre-render based on types
  const paths = data?.types?.flatMap((type: any) =>
    locales?.map((locale) => ({ params: { pages: [type.slug] }, locale }))
  );

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return {
    paths: paths.concat(
      locales?.map((locale) => ({ params: { pages: [] }, locale }))
    ),
    fallback: false,
  };
}
// This also gets called at build time
export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const apolloClient = initializeApollo();
  await apolloClient.query({
    query: SettingsDocument,
  });
  const { data } = await apolloClient.query({
    query: GroupsDocument,
  });
  const homePage =
    data?.types?.find((type: any) => type?.settings?.isHome)?.slug ??
    data?.types?.[0]?.slug;
  await apolloClient.query({
    query: GroupDocument,
    variables: {
      slug: params?.pages?.[0] ?? homePage,
    },
  });
  await apolloClient.query({
    query: ProductsDocument,
    variables: getProducts({
      type: params?.pages?.[0] ?? homePage,
      limit: 30,
    }),
  });
  await apolloClient.query({
    query: CategoriesDocument,
    variables: getCategories({
      type: params?.pages?.[0] ?? homePage,
      limit: 100,
    }),
  });

  return addApolloState(apolloClient, {
    props: {
      ...(await serverSideTranslations(locale!, ['common', 'banner'])),
    },
    revalidate: 120,
  });
};
