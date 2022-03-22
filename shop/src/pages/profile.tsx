import ProfileAddressGrid from '@components/profile/profile-address';
import Card from '@components/ui/cards/card';
import { useTranslation } from 'next-i18next';
import DashboardSidebar from '@components/dashboard/sidebar';
import { getLayout as getSiteLayout } from '@components/layouts/layout';
import ProfileInformation from '@framework/profile/profile-information';
import useUser from '@framework/auth/use-user';
import ProfileContact from '@components/profile/profile-contact';
export { getStaticProps } from '@framework/ssr/common';

const ProfilePage = () => {
  const { t } = useTranslation('common');
  const { me } = useUser();

  return (
    <div className="w-full overflow-hidden px-1 pb-1">
      <div className="mb-8">
        <ProfileInformation />
        <ProfileContact
          userId={me?.id!}
          profileId={me?.profile?.id!}
          contact={me?.profile?.contact!}
        />
      </div>

      <Card className="w-full">
        <ProfileAddressGrid
          userId={me?.id!}
          //@ts-ignore
          addresses={me?.address!}
          label={t('text-addresses')}
        />
      </Card>
    </div>
  );
};
const getLayout = (page: React.ReactElement) =>
  getSiteLayout(
    <div className="bg-gray-100 flex flex-col xl:flex-row items-start max-w-1920 w-full mx-auto py-10 px-5 xl:py-14 xl:px-8 2xl:px-14">
      <DashboardSidebar className="flex-shrink-0 hidden xl:block xl:w-80 me-8" />
      {page}
    </div>
  );

ProfilePage.authenticate = true;

ProfilePage.getLayout = getLayout;
export default ProfilePage;
