import Button from '@components/ui/button';
import NotFound from '@components/ui/not-found';
import { Image } from '@components/ui/image';
import noResult from '@assets/no-result.svg';
import DashboardSidebar from '@components/dashboard/sidebar';
import Orders from '@framework/orders/orders';
import { getLayout as getSiteLayout } from '@components/layouts/layout';
export { getStaticProps } from '@framework/ssr/common';

export default function OrdersPage() {
  return <Orders />;
}

const getLayout = (page: React.ReactElement) =>
  getSiteLayout(
    <div className="bg-light flex flex-col xl:flex-row items-start max-w-1920 w-full mx-auto py-10 px-5 xl:py-14 xl:px-8 2xl:px-14 min-h-screen">
      <DashboardSidebar className="flex-shrink-0 hidden xl:block xl:w-80 me-8" />
      {page}
    </div>
  );
OrdersPage.authenticate = true;

OrdersPage.getLayout = getLayout;
