import { SettingsProvider } from '@components/settings/settings.context';
import ErrorMessage from '@components/ui/error-message';
import PageLoader from '@components/ui/loaders/page-loader';
import { useSettingsQuery } from './settings.graphql';

export const AppSettings: React.FC = (props) => {
  const { data, loading, error } = useSettingsQuery();
  if (loading) return <PageLoader />;
  if (error) return <ErrorMessage message={error.message} />;
  return <SettingsProvider initialValue={data?.settings?.options} {...props} />;
};
