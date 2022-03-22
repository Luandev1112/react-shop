import { useGroupQuery } from '@framework/groups/groups.query';
import useHomepage from '@framework/utils/use-homepage';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';
const ErrorMessage = dynamic(() => import('@components/ui/error-message'));
const BannerWithSearch = dynamic(
  () => import('@components/banners/banner-with-search')
);
const BannerShort = dynamic(() => import('@components/banners/banner-short'));

const MAP_BANNER_TO_GROUP: Record<string, any> = {
  classic: BannerWithSearch,
  modern: BannerShort,
  standard: BannerWithSearch,
  default: BannerWithSearch,
};

const Banner: React.FC<{ layout: string }> = ({ layout }) => {
  const router = useRouter();
  const { homePage } = useHomepage();
  const group = useMemo(
    () => router.query.pages?.[0] ?? homePage?.slug,
    [router.query.pages, homePage]
  );
  const { data, error } = useGroupQuery(group?.toString()!);

  if (error) return <ErrorMessage message={error.message} />;
  const Component = layout
    ? MAP_BANNER_TO_GROUP[layout]
    : MAP_BANNER_TO_GROUP['default'];
  return <Component banners={data?.type?.banners} layout={layout} />;
};

export default Banner;
