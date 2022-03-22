import ChevronLeft from '@components/icons/chevron-left';
import ChevronRight from '@components/icons/chevron-right';
import {
  Swiper,
  SwiperSlide,
  SwiperOptions,
  Navigation,
  Thumbs,
} from '@components/ui/slider';
import { Image } from '@components/ui/image';
import { useRef, useState } from 'react';
import { productPlaceholder } from '@lib/placeholders';
import { useIsRTL } from '@lib/locals';

interface Props {
  gallery: any[];
}
// product gallery breakpoints
const galleryCarouselBreakpoints = {
  320: {
    slidesPerView: 2,
  },
  480: {
    slidesPerView: 3,
  },
  640: {
    slidesPerView: 3,
  },
  800: {
    slidesPerView: 4,
  },
};
const swiperParams: SwiperOptions = {
  slidesPerView: 1,
  spaceBetween: 0,
};
export const ThumbsCarousel: React.FC<Props> = ({ gallery }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const { isRTL } = useIsRTL();
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  return (
    <div>
      <div className="relative">
        <Swiper
          id="productGallery"
          modules={[Navigation, Thumbs]}
          thumbs={{ swiper: thumbsSwiper }}
          navigation={{
            prevEl: prevRef.current!, // Assert non-null
            nextEl: nextRef.current!, // Assert non-null
          }}
          {...swiperParams}
        >
          {gallery?.map((item: any) => (
            <SwiperSlide
              key={`product-gallery-${item.id}`}
              className="flex items-center justify-center selection:bg-transparent"
            >
              <Image
                src={item?.original ?? productPlaceholder}
                alt={`Product gallery ${item.id}`}
                width={450}
                height={450}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div
          ref={prevRef}
          className="product-gallery-prev cursor-pointer absolute top-2/4 -start-4 md:-start-5 z-10 -mt-4 md:-mt-5 w-8 h-8 md:w-9 md:h-9 rounded-full bg-light shadow-xl border border-border-200 border-opacity-70 flex items-center justify-center text-heading transition-all duration-200 hover:bg-gray-100"
        >
          {isRTL ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </div>
        <div
          ref={nextRef}
          className="product-gallery-next cursor-pointer absolute top-2/4 -end-4 md:-end-5 z-10 -mt-4 md:-mt-5 w-8 h-8 md:w-9 md:h-9 rounded-full bg-light shadow-xl border border-border-200 border-opacity-70 flex items-center justify-center text-heading transition-all duration-200 hover:bg-gray-100"
        >
          {isRTL ? (
            <ChevronLeft className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </div>
      </div>
      {/* End of product main slider */}

      <div className="max-w-md mt-5 lg:mt-8 mx-auto relative lg:pb-2">
        <Swiper
          id="productGalleryThumbs"
          onSwiper={setThumbsSwiper}
          spaceBetween={20}
          watchSlidesProgress={true}
          freeMode={true}
          observer={true}
          observeParents={true}
          breakpoints={galleryCarouselBreakpoints}
        >
          {gallery?.map((item: any) => (
            <SwiperSlide
              key={`product-thumb-gallery-${item.id}`}
              className="flex items-center justify-center cursor-pointer rounded overflow-hidden border border-border-200 border-opacity-75 hover:opacity-75"
            >
              <Image
                src={item?.thumbnail ?? productPlaceholder}
                alt={`Product thumb gallery ${item.id}`}
                width={80}
                height={80}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
