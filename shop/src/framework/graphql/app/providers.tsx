import { AppSettings } from './settings';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '@framework/utils/apollo';

interface AppProviderProps {
  pageProps: any;
}
const AppProviders: React.FC<AppProviderProps> = ({ pageProps, children }) => {
  const apolloClient = useApollo(pageProps);
  return (
    <ApolloProvider client={apolloClient}>
      <AppSettings>{children}</AppSettings>
    </ApolloProvider>
  );
};

export default AppProviders;
