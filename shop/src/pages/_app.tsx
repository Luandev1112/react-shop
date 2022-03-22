import type { AppProps } from 'next/app';
import AppProviders from '@framework/app/providers';
import { appWithTranslation } from 'next-i18next';
import '@assets/css/main.css';
import { CartProvider } from '@store/quick-cart/cart.context';
import { ModalProvider } from '@components/ui/modal/modal.context';
import ManagedModal from '@components/ui/modal/managed-modal';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ManagedDrawer from '@components/ui/drawer/managed-drawer';
import PrivateRoute from '@lib/private-route';
import DefaultSeo from '@components/seo/default-seo';
import SocialLogin from '@framework/auth/social-login';
import type { NextPage } from 'next';
import { Provider as NextAuthProvider } from 'next-auth/client';
import Search from '@components/ui/search/search';
import { SearchProvider } from '@components/ui/search/search.context';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
  authenticate?: boolean;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function CustomApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);
  const authProps = Component.authenticate;

  return (
    <AppProviders pageProps={pageProps}>
      <SearchProvider>
        <ModalProvider>
          <CartProvider>
            <NextAuthProvider>
              <>
                <DefaultSeo />
                {Boolean(authProps) ? (
                  <PrivateRoute>
                    {getLayout(<Component {...pageProps} />)}
                  </PrivateRoute>
                ) : (
                  getLayout(<Component {...pageProps} />)
                )}
                <ManagedModal />
                <ManagedDrawer />
                <ToastContainer autoClose={2000} theme="colored" />
                <SocialLogin />
              </>
            </NextAuthProvider>
          </CartProvider>
        </ModalProvider>
      </SearchProvider>
    </AppProviders>
  );
}
export default appWithTranslation(CustomApp);
