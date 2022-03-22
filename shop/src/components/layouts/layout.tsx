import Header from './header';
import MobileNavigation from './mobile-navigation';

const SiteLayout: React.FC = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen transition-colors duration-150 bg-gray-100">
      <Header />
      {children}
      <MobileNavigation />
    </div>
  );
};
export const getLayout = (page: React.ReactElement) => (
  <SiteLayout>{page}</SiteLayout>
);
export default SiteLayout;
