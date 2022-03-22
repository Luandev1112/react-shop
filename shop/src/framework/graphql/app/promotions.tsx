import PromotionSlider from '@components/promotions/promotion-slider';
import ErrorMessage from '@components/ui/error-message';
import { useGroupQuery } from '@framework/groups/groups.graphql';
import useHomepage from '@framework/utils/use-homepage';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

const PromotionSliders: React.FC = () => {
  const router = useRouter();
  const { homePage } = useHomepage();

  const group = useMemo(
    () => router.query.pages?.[0] ?? homePage?.slug,
    [router.query.pages, homePage]
  );
  const { data, error } = useGroupQuery({
    variables: {
      slug: group?.toString()!,
    },
  });
  if (error) return <ErrorMessage message={error.message} />;
  if (!data?.type?.promotional_sliders) return null;
  return <PromotionSlider sliders={data?.type?.promotional_sliders} />;
};

export default PromotionSliders;
