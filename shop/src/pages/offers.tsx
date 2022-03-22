import Coupons from '@framework/coupons/coupons';
import { getLayout } from '@components/layouts/layout';
export { getStaticProps } from '@framework/ssr/common';

export default function OfferPage() {
  return <Coupons />;
}

OfferPage.getLayout = getLayout;
