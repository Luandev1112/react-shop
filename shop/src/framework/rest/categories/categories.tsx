import { useRouter } from 'next/router';
import ErrorMessage from '@components/ui/error-message';
import { useCategoriesQuery } from '@framework/categories/categories.query';
import dynamic from 'next/dynamic';
import useHomepage from '@framework/utils/use-homepage';
const StickySidebarListCategories = dynamic(
  () => import('@components/categories/sticky-sidebar-list-categories')
);
const StaticSidebarVerticalRectangleCategories = dynamic(
  () =>
    import(
      '@components/categories/static-sidebar-vertical-rectangle-categories'
    )
);
const StickySidebarBoxedCategories = dynamic(
  () => import('@components/categories/sticky-sidebar-boxed-categories')
);

const MAP_CATEGORY_TO_GROUP: Record<string, any> = {
  classic: StickySidebarListCategories,
  modern: StickySidebarBoxedCategories,
  standard: StaticSidebarVerticalRectangleCategories,
  default: StickySidebarListCategories,
};

const Categories: React.FC<{ layout: string; className?: string }> = ({
  layout,
  className,
}) => {
  const { query } = useRouter();
  const { homePage } = useHomepage();
  const {
    data,
    isLoading: loading,
    error,
  } = useCategoriesQuery({
    type: (query.pages?.[0] as string) ?? homePage?.slug,
  });

  if (error) return <ErrorMessage message={error.message} />;
  const Component = layout
    ? MAP_CATEGORY_TO_GROUP[layout]
    : MAP_CATEGORY_TO_GROUP['default'];
  return (
    <Component
      notFound={!Boolean(data?.categories?.data?.length)}
      categories={data?.categories?.data}
      loading={loading}
      className={className}
    />
  );
};

export default Categories;
