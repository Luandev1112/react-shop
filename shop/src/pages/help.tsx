import Accordion from '@components/ui/accordion';
import { faq } from '@settings/faq';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { GetStaticProps } from 'next';
import { getLayout } from '@components/layouts/layout';

export default function HelpPage() {
  const { t } = useTranslation();
  return (
    <section className="py-8 px-4 lg:py-10 lg:px-8 xl:py-14 xl:px-16 2xl:px-20">
      <header className="text-center mb-8">
        <h1 className="font-bold text-xl md:text-2xl xl:text-3xl">
          {t('common:nav-menu-faq')}
        </h1>
      </header>
      <div className="max-w-screen-lg w-full mx-auto">
        <Accordion items={faq} translatorNS="faq" />
      </div>
    </section>
  );
}

HelpPage.getLayout = getLayout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common', 'faq'])),
    },
  };
};
