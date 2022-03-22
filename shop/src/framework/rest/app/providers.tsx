import { useRef } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import { ReactQueryDevtools } from 'react-query/devtools';
import { AppSettings } from './settings';

interface AppProviderProps {
  pageProps: any;
}
const AppProviders: React.FC<AppProviderProps> = ({ pageProps, children }) => {
  const queryClientRef = useRef<any>(null);
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }
  return (
    <QueryClientProvider client={queryClientRef.current}>
      <Hydrate state={pageProps.dehydratedState}>
        <AppSettings>
          {/* <ModalProvider>
            <CartProvider>
              <UIProvider>
                <CheckoutProvider>
                  <SearchProvider>
                    <Layout {...pageProps}>
                      <Seo />
                      <Component {...pageProps} />
                    </Layout>
                    <ToastContainer autoClose={2000} />
                    <ManagedModal />
                    <SidebarContainer />
                  </SearchProvider>
                </CheckoutProvider>
                <SocialLoginProvider />
              </UIProvider>
            </CartProvider>
          </ModalProvider> */}
          {children}
        </AppSettings>
        {/* <ReactQueryDevtools /> */}
      </Hydrate>
    </QueryClientProvider>
  );
};

export default AppProviders;
