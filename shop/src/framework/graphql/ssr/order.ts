import { SettingsDocument } from '@framework/app/settings.graphql';
import { addApolloState, initializeApollo } from '@framework/utils/apollo';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GroupsDocument } from '@framework/groups/groups.graphql';
export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const apolloClient = initializeApollo();
  await apolloClient.query({
    query: SettingsDocument,
  });
  await apolloClient.query({
    query: GroupsDocument,
  });
  return addApolloState(apolloClient, {
    props: {
      ...(await serverSideTranslations(locale!, ['common'])),
    },
  });
};
