import { Image } from '@components/ui/image';
import BackButton from '@components/ui/back-button';
import { AddToCart } from '@components/products/add-to-cart/add-to-cart';
import usePrice from '@lib/use-price';
import { ThumbsCarousel } from '@components/ui/thumb-carousel';
import { useTranslation } from 'next-i18next';
import { getVariations } from '@lib/get-variations';
import { useMemo } from 'react';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';
import Truncate from '@components/ui/truncate';
import { scroller, Element } from 'react-scroll';
import CategoryBadges from './category-badges';
import VariationPrice from './variation-price';
import { useRouter } from 'next/router';
import { ROUTES } from '@lib/routes';
import { Product } from '@framework/types';
import { productPlaceholder } from '@lib/placeholders';
import { useAtom } from 'jotai';
import VariationGroups from './variation-groups';
import { isVariationSelected } from '@lib/is-variation-selected';
import { useModalAction } from '@components/ui/modal/modal.context';
import { Waypoint } from 'react-waypoint';
import { stickyShortDetailsAtom } from '@store/sticky-short-details-atom';
import { useAttributes } from './attributes.context';
import classNames from 'classnames';

type Props = {
  product: Product;
  backBtn?: boolean;
  isModal?: boolean;
};
const Details: React.FC<Props> = ({
  product,
  backBtn = true,
  isModal = false,
}) => {
  const {
    name,
    image, //could only had image we need to think it also
    description,
    unit,
    categories,
    gallery,
    type,
    quantity,
    shop,
    slug,
  } = product ?? {};
  const { t } = useTranslation('common');
  const [_, setShowStickyShortDetails] = useAtom(stickyShortDetailsAtom);

  const router = useRouter();
  const { closeModal } = useModalAction();

  const { attributes } = useAttributes();

  const { price, basePrice, discount } = usePrice({
    amount: product?.sale_price ? product?.sale_price : product?.price!,
    baseAmount: product?.price,
  });

  const navigate = (path: string) => {
    router.push(path);
    closeModal();
  };

  const variations = useMemo(
    () => getVariations(product?.variations),
    [product?.variations]
  );
  const isSelected = isVariationSelected(variations, attributes);
  let selectedVariation: any = {};
  if (isSelected) {
    selectedVariation = product?.variation_options?.find((o: any) =>
      isEqual(
        o.options.map((v: any) => v.value).sort(),
        Object.values(attributes).sort()
      )
    );
  }

  const scrollDetails = () => {
    scroller.scrollTo('details', {
      smooth: true,
      offset: -80,
    });
  };

  const onWaypointPositionChange = ({
    currentPosition,
  }: Waypoint.CallbackArgs) => {
    if (!currentPosition || currentPosition === 'above') {
      setShowStickyShortDetails(true);
    }
  };
  const hasVariations = !isEmpty(variations);

  return (
    <article className="rounded-lg bg-light">
      <div className="flex flex-col md:flex-row border-b border-border-200 border-opacity-70">
        <div className="md:w-1/2 p-6 pt-10 lg:p-14 xl:p-16">
          <div className="flex items-center justify-between mb-8 lg:mb-10">
            {backBtn && <BackButton />}
            {discount && (
              <div className="rounded-full text-xs leading-6 font-semibold px-3 bg-yellow-500 text-light ms-auto">
                {discount}
              </div>
            )}
          </div>

          <div className="product-gallery h-full">
            {!!gallery?.length ? (
              <ThumbsCarousel gallery={gallery} />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Image
                  src={image?.original ?? productPlaceholder}
                  alt={name}
                  width={450}
                  height={450}
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col items-start md:w-1/2 p-5 pt-10 lg:p-14 xl:p-16">
          <Waypoint
            onLeave={() => setShowStickyShortDetails(true)}
            onEnter={() => setShowStickyShortDetails(false)}
            onPositionChange={onWaypointPositionChange}
          >
            <div className="w-full">
              <h1
                className={classNames(
                  `font-semibold text-lg md:text-xl xl:text-2xl tracking-tight text-heading`,
                  {
                    'cursor-pointer transition-colors hover:text-accent':
                      isModal,
                  }
                )}
                {...(isModal && {
                  onClick: () => navigate(`${ROUTES.PRODUCT}/${slug}`),
                })}
              >
                {name}
              </h1>

              {unit && !hasVariations && (
                <span className="text-sm font-normal text-body mt-2 md:mt-3 block">
                  {unit}
                </span>
              )}

              {description && (
                <div className="mt-3 md:mt-4 text-body text-sm leading-7">
                  <Truncate
                    character={150}
                    {...(!isModal && {
                      onClick: () => scrollDetails(),
                      compressText: 'common:text-see-more',
                    })}
                  >
                    {description}
                  </Truncate>
                </div>
              )}

              {hasVariations ? (
                <>
                  <div className="my-5 md:my-10 flex items-center">
                    <VariationPrice
                      selectedVariation={selectedVariation}
                      minPrice={product.min_price}
                      maxPrice={product.max_price}
                    />
                  </div>
                  <div>
                    <VariationGroups variations={variations} />
                  </div>
                </>
              ) : (
                <span className="my-5 md:my-10 flex items-center">
                  <ins className="text-2xl md:text-3xl font-semibold text-accent no-underline">
                    {price}
                  </ins>
                  {basePrice && (
                    <del className="text-sm md:text-base font-normal text-muted ms-2">
                      {basePrice}
                    </del>
                  )}
                </span>
              )}

              <div className="mt-4 md:mt-6 flex flex-col lg:flex-row items-center">
                <div className="mb-3 lg:mb-0 w-full lg:max-w-[400px]">
                  <AddToCart
                    data={product}
                    variant="big"
                    variation={selectedVariation}
                    disabled={selectedVariation?.is_disable || !isSelected}
                  />
                </div>

                {!hasVariations && (
                  <>
                    {Number(quantity) > 0 ? (
                      <span className="text-base text-body whitespace-nowrap lg:ms-7">
                        {quantity} {t('text-pieces-available')}
                      </span>
                    ) : (
                      <div className="text-base text-red-500 whitespace-nowrap lg:ms-7">
                        {t('text-out-stock')}
                      </div>
                    )}
                  </>
                )}
                {!isEmpty(selectedVariation) && (
                  <span className="text-base text-body whitespace-nowrap lg:ms-7">
                    {selectedVariation?.is_disable ||
                    selectedVariation.quantity === 0
                      ? t('text-out-stock')
                      : `${selectedVariation.quantity} ${t(
                          'text-pieces-available'
                        )}`}
                  </span>
                )}
              </div>
            </div>
          </Waypoint>

          {!!categories?.length && (
            <CategoryBadges
              categories={categories}
              basePath={`/${type?.slug}`}
              onClose={closeModal}
            />
          )}

          {shop?.name && (
            <div className="flex items-center mt-2">
              <span className="text-sm font-semibold text-heading capitalize me-6 py-1">
                {t('common:text-sellers')}
              </span>

              <button
                onClick={() => navigate(`${ROUTES.SHOPS}/${shop?.slug}`)}
                className="text-sm text-accent tracking-wider transition underline hover:text-accent-hover hover:no-underline"
              >
                {shop?.name}
              </button>
            </div>
          )}
        </div>
      </div>

      <Element
        name="details"
        className="py-4 px-5 lg:px-16 lg:py-14 border-b border-border-200 border-opacity-70"
      >
        <h2 className="text-lg text-heading tracking-tight font-semibold mb-4 md:mb-6">
          {t('text-details')}
        </h2>
        <p className="text-sm text-body">{description}</p>
      </Element>
    </article>
  );
};

export default Details;
