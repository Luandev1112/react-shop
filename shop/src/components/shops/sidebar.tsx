import cn from 'classnames';
import { Image } from '@components/ui/image';
import { useTranslation } from 'next-i18next';
import { formatAddress } from '@lib/format-address';
import isEmpty from 'lodash/isEmpty';
import ReadMore from '@components/ui/truncate';
import { useModalAction } from '@components/ui/modal/modal.context';
import Scrollbar from '@components/ui/scrollbar';
import { getIcon } from '@lib/get-icon';
import { productPlaceholder } from '@lib/placeholders';
import * as socialIcons from '@components/icons/social';

type ShopSidebarProps = {
  data: any;
  className?: string;
  cardClassName?: string;
};

const ShopSidebar: React.FC<ShopSidebarProps> = ({
  data,
  className,
  cardClassName,
}) => {
  const { t } = useTranslation('common');
  const { openModal } = useModalAction();

  function handleMoreInfoModal() {
    return openModal('SHOP_INFO', data);
  }
  return (
    <>
      <div
        className={cn(
          'flex items-center lg:hidden w-full bg-light border-b border-gray-300 py-4 px-6 sticky top-[55px] z-10',
          cardClassName
        )}
      >
        <div className="w-16 h-16 rounded-lg relative mx-auto border border-gray-100 bg-gray-200 overflow-hidden me-4 flex-shrink-0">
          <Image
            alt={t('logo')}
            src={data?.shop?.logo?.original! ?? productPlaceholder}
            layout="fill"
            objectFit="cover"
          />
        </div>

        <div className="w-full">
          <h3 className="text-base font-semibold text-heading">
            {data?.shop?.name}
          </h3>

          <button
            className="text-sm font-semibold transition text-accent hover:text-accent-hover"
            onClick={handleMoreInfoModal}
          >
            {t('text-more-info')}
          </button>
        </div>
      </div>

      <aside
        className={cn(
          'bg-light md:rounded h-full w-full lg:w-80 2xl:w-96 hidden lg:block',
          className
        )}
      >
        <div className="max-h-full overflow-hidden">
          <Scrollbar className={cn('w-full', 'scrollbar_height')}>
            <div className="w-full border-b border-gray-200 p-7 flex flex-col items-center">
              <div className="w-44 h-44 rounded-lg relative mx-auto border border-gray-100 bg-gray-200 overflow-hidden mb-8">
                <Image
                  alt={t('logo')}
                  src={data?.shop?.logo?.original! ?? productPlaceholder}
                  layout="fill"
                  objectFit="cover"
                />
              </div>

              <h3 className="text-lg font-semibold text-heading mb-2">
                {data?.shop?.name}
              </h3>

              {data?.shop?.description && (
                <p className="text-sm text-body mb-2 text-center leading-relaxed">
                  <ReadMore character={70}>{data?.shop?.description}</ReadMore>
                </p>
              )}

              <div className="flex items-center justify-start mt-3">
                {data?.shop?.settings?.socials?.map(
                  (item: any, index: number) => (
                    <a
                      key={index}
                      href={item.url}
                      target="_blank"
                      className={`text-muted focus:outline-none me-6 last:me-0 transition-colors duration-300 hover:${item.hoverClass}`}
                      rel="noreferrer"
                    >
                      {getIcon({
                        iconList: socialIcons,
                        iconName: item.icon,
                        className: 'w-4 h-4',
                      })}
                    </a>
                  )
                )}
              </div>
            </div>

            <div className="p-7">
              <div className="mb-7 last:mb-0 flex flex-col">
                <span className="text-sm text-heading font-semibold mb-2">
                  {t('text-address')}
                </span>
                <span className="text-sm text-body">
                  {!isEmpty(formatAddress(data?.shop?.address))
                    ? formatAddress(data?.shop?.address)
                    : t('common:text-no-address')}
                </span>
              </div>

              <div className="mb-7 last:mb-0 flex flex-col">
                <span className="text-sm text-heading font-semibold mb-2">
                  {t('text-phone')}
                </span>
                <span className="text-sm text-body">
                  {data?.shop?.settings?.contact
                    ? data?.shop?.settings?.contact
                    : t('text-no-contact')}
                </span>
              </div>

              {data?.shop?.settings?.website && (
                <div className="flex flex-col">
                  <span className="text-sm text-heading font-semibold mb-2">
                    {t('text-website')}
                  </span>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-body">
                      {data?.shop?.settings?.website}
                    </span>
                    <a
                      href={data?.shop?.settings?.website}
                      target="_blank"
                      className="text-sm text-accent font-semibold hover:text-accent-hover focus:outline-none focus:text-accent-hover"
                      rel="noreferrer"
                    >
                      {t('text-visit-site')}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </Scrollbar>
        </div>
      </aside>
    </>
  );
};

export default ShopSidebar;
