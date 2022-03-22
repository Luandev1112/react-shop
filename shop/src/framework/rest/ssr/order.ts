import { fetchSettings } from '@framework/app/settings.query';
import { fetchGroups } from '@framework/groups/groups.query';
import { API_ENDPOINTS } from '@framework/utils/endpoints';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(API_ENDPOINTS.SETTINGS, fetchSettings);
  await queryClient.prefetchQuery(API_ENDPOINTS.TYPE, fetchGroups);
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common'])),
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};
