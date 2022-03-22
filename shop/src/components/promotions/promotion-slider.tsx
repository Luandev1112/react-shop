import { ArrowNext, ArrowPrev } from '@components/icons';
import { Swiper, SwiperSlide, Navigation } from '@components/ui/slider';
import { Image } from '@components/ui/image';
import { useTranslation } from 'next-i18next';

const offerSliderBreakpoints = {
  320: {
    slidesPerView: 1,
    spaceBetween: 0,
  },
  580: {
    slidesPerView: 2,
    spaceBetween: 16,
  },
  1024: {
    slidesPerView: 3,
    spaceBetween: 16,
  },
  1920: {
    slidesPerView: 4,
    spaceBetween: 24,
  },
};

export default function PromotionSlider({ sliders }: { sliders: any[] }) {
  const { t } = useTranslation();
  return (
    <div className="px-6 py-5 md:p-8 border-t border-border-200 bg-light">
      <div className="relative">
        <Swiper
          id="offer"
          loop={true}
          breakpoints={offerSliderBreakpoints}
          modules={[Navigation]}
          navigation={{
            nextEl: '.next',
            prevEl: '.prev',
          }}
        >
          {sliders?.map((d) => (
            <SwiperSlide key={d.id}>
              <Image
                className="w-full h-auto"
                src={d.original}
                alt={d.id}
                layout="responsive"
                width="580"
                height="270"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div
          className="prev cursor-pointer absolute top-2/4 -start-4 md:-start-5 z-10 -mt-4 md:-mt-5 w-8 h-8 md:w-9 md:h-9 rounded-full bg-light shadow-xl border border-border-200 border-opacity-70 flex items-center justify-center text-heading transition-all duration-200 hover:bg-accent hover:text-light hover:border-accent"
          role="button"
        >
          <span className="sr-only">{t('common:text-previous')}</span>
          <ArrowPrev width={18} height={18} />
        </div>
        <div
          className="next cursor-pointer absolute top-2/4 -end-4 md:-end-5 z-10 -mt-4 md:-mt-5 w-8 h-8 md:w-9 md:h-9 rounded-full bg-light shadow-xl border border-border-200 border-opacity-70 flex items-center justify-center text-heading transition-all duration-200 hover:bg-accent hover:text-light hover:border-accent"
          role="button"
        >
          <span className="sr-only">{t('common:text-next')}</span>
          <ArrowNext width={18} height={18} />
        </div>
      </div>
    </div>
  );
}
