import { useTranslation } from 'next-i18next';
import Contact from '@framework/contact/contact';
import { Image } from '@components/ui/image';
import contactIllustration from '@assets/contact-illustration.svg';
import { getLayout } from '@components/layouts/layout';
import { useSettings } from '@components/settings/settings.context';
import { formatAddress } from '@lib/format-address';
import { getIcon } from '@lib/get-icon';
import isEmpty from 'lodash/isEmpty';
import * as socialIcons from '@components/icons/social';
export { getStaticProps } from '@framework/ssr/common';

export const ContactPage = () => {
  const { t } = useTranslation('common');
  const settings = useSettings();
  return (
    <div className="w-full bg-gray-100">
      <div className="flex flex-col md:flex-row max-w-7xl w-full mx-auto py-10 px-5 xl:py-14 xl:px-8 2xl:px-14">
        {/* sidebar */}
        <div className="w-full md:w-72 lg:w-96 bg-light p-5 flex-shrink-0 order-2 md:order-1">
          <div className="w-full flex items-center justify-center overflow-hidden mb-8">
            <Image
              src={contactIllustration}
              alt={t('nav-menu-contact')}
              className="w-full h-auto"
            />
          </div>

          <div className="flex flex-col mb-8">
            <span className="font-semibold text-heading mb-3">
              {t('text-address')}
            </span>
            <span className="text-sm text-body">
              {!isEmpty(formatAddress(settings?.contactDetails?.location))
                ? formatAddress(settings?.contactDetails?.location)
                : t('common:text-no-address')}
            </span>
          </div>

          <div className="flex flex-col mb-8">
            <span className="font-semibold text-heading mb-3">
              {t('text-phone')}
            </span>
            <span className="text-sm text-body">
              {settings?.contactDetails?.contact
                ? settings?.contactDetails?.contact
                : t('text-no-contact')}
            </span>
          </div>
          {settings?.contactDetails?.website && (
            <div className="flex flex-col mb-8">
              <span className="font-semibold text-heading mb-3">
                {t('text-website')}
              </span>
              <div className="flex items-center justify-between">
                <span className="text-sm text-body">
                  {settings?.contactDetails?.website}
                </span>
                <a
                  href={settings?.contactDetails?.website ?? '#'}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-accent font-semibold hover:text-accent-hover focus:outline-none focus:text-blue-500"
                >
                  {t('text-visit-site')}
                </a>
              </div>
            </div>
          )}

          <div className="flex flex-col mb-8">
            <span className="font-semibold text-heading mb-4">
              {t('text-follow-us')}
            </span>
            <div className="flex items-center justify-start">
              {settings?.contactDetails?.socials?.map(
                (item: any, index: number) => (
                  <a
                    key={index}
                    href={item?.url}
                    target="_blank"
                    rel="noreferrer"
                    className={`text-muted focus:outline-none me-8 last:me-0 transition-colors duration-300 hover:${item.hoverClass}`}
                  >
                    {getIcon({
                      iconList: socialIcons,
                      iconName: item?.icon,
                      className: 'w-4 h-4',
                    })}
                  </a>
                )
              )}
            </div>
          </div>
        </div>

        {/* Contact form */}
        <div className="w-full order-1 md:order-2 mb-8 md:mb-0 md:ms-7 lg:ms-9 p-5 md:p-8 bg-light">
          <h1 className="mb-7 text-xl md:text-2xl font-body font-bold text-heading">
            {t('text-questions-comments')}
          </h1>
          <Contact />
        </div>
      </div>
    </div>
  );
};
ContactPage.getLayout = getLayout;
export default ContactPage;
