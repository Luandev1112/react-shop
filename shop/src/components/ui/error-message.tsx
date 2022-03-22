import { useTranslation } from 'next-i18next';
interface ErrorProps {
  message?: string;
}

export const Error: React.FC<ErrorProps> = ({ message }) => {
  const { t } = useTranslation('common');
  return <p className="my-2 text-xs text-start text-red-500">{t(message!)}</p>;
};

const ErrorMessage: React.FC<ErrorProps> = ({ message }) => {
  const { t } = useTranslation('common');
  return (
    <p className="bg-red-400 p-5 mt-16 mx-auto max-w-sm min-w-min text-center text-lg text-light font-semibold rounded">
      {t(message!)}
    </p>
  );
};

export default ErrorMessage;
