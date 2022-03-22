import Shops from '@framework/shops/shops';
import { getLayout } from '@components/layouts/layout';
export { getStaticProps } from '@framework/ssr/shops';

export default function ShopsPage() {
  return <Shops />;
}

ShopsPage.getLayout = getLayout;
