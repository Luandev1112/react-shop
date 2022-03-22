import { useGroupsQuery } from '@framework/groups/groups.query';
import { useRouter } from 'next/router';
const useLayout = () => {
  const { data } = useGroupsQuery();
  const router = useRouter();
  if (router?.asPath === '/') {
    const homePage =
      data?.types.find((type) => type?.settings?.isHome) ?? data?.types?.[0];
    return {
      layout: homePage?.settings?.layoutType,
      page: homePage,
    };
  }
  const page = data?.types.find((type) => router.asPath.includes(type.slug));
  return {
    layout: page?.settings?.layoutType,
    page,
  };
};

export default useLayout;
