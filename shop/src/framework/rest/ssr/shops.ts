import { fetchSettings } from '@framework/app/settings.query';
import { fetchGroups } from '@framework/groups/groups.query';
import { fetchShops } from '@framework/shops/shops.query';
import { API_ENDPOINTS } from '@framework/utils/endpoints';
import { GetStaticProps } from 'next';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(API_ENDPOINTS.SETTINGS, fetchSettings);
  await queryClient.prefetchQuery(API_ENDPOINTS.TYPE, fetchGroups, {
    staleTime: 60 * 1000,
  });
  await queryClient.prefetchInfiniteQuery(
    [API_ENDPOINTS.SHOPS, { is_active: 1 }],
    fetchShops
  );
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common', 'banner'])),
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};
