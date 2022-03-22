import Card from '@components/ui/cards/card';
import { useTranslation } from 'next-i18next';
import DashboardSidebar from '@components/dashboard/sidebar';
import ChangePassword from '@framework/auth/change-password';
import { getLayout as getSiteLayout } from '@components/layouts/layout';
export { getStaticProps } from '@framework/ssr/common';

const ChangePasswordPage = () => {
  const { t } = useTranslation('common');

  return (
    <Card className="w-full">
      <h1 className="mb-5 sm:mb-8 text-lg sm:text-xl text-heading font-semibold">
        {t('change-password')}
      </h1>
      <ChangePassword />
    </Card>
  );
};
const getLayout = (page: React.ReactElement) =>
  getSiteLayout(
    <div className="min-h-screen transition-colors duration-150 bg-gray-100">
      <div className="flex flex-col xl:flex-row items-start max-w-1920 w-full mx-auto py-10 px-8 xl:py-14 xl:px-16 2xl:px-20 bg-gray-100">
        <DashboardSidebar className="flex-shrink-0 hidden xl:block xl:w-80 me-10" />
        {page}
      </div>
    </div>
  );

ChangePasswordPage.authenticate = true;

ChangePasswordPage.getLayout = getLayout;
export default ChangePasswordPage;
