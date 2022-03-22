import { GetStaticProps } from 'next';
import { SettingsDocument } from '@framework/app/settings.graphql';
import { GroupsDocument } from '@framework/groups/groups.graphql';
import { addApolloState, initializeApollo } from '@framework/utils/apollo';
import { ShopsDocument } from '@framework/shops/shops.graphql';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const apolloClient = initializeApollo();
  await apolloClient.query({
    query: SettingsDocument,
  });
  await apolloClient.query({
    query: GroupsDocument,
  });
  await apolloClient.query({
    query: ShopsDocument,
    variables: {
      is_active: true,
    },
  });
  return addApolloState(apolloClient, {
    props: {
      ...(await serverSideTranslations(locale!, ['common'])),
    },
  });
};
