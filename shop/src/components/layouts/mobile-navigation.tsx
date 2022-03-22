import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { NavbarIcon } from '@components/icons/navbar-icon';
import { SearchIcon } from '@components/icons/search-icon';
import { HomeIcon } from '@components/icons/home-icon';
import { ShoppingBagIcon } from '@components/icons/shopping-bag-icon';
import { UserIcon } from '@components/icons/user-icon';
import { useTranslation } from 'next-i18next';
import { useCart } from '@store/quick-cart/cart.context';
import { useModalAction } from '@components/ui/modal/modal.context';
import { useIsHomePage } from '@lib/use-is-homepage';
import { useAtom } from 'jotai';
import { drawerAtom } from '@store/drawer-atom';
import { authorizationAtom } from '@store/authorization-atom';
import { displayMobileHeaderSearchAtom } from '@store/display-mobile-header-search-atom';
import { useIsRTL } from '@lib/locals';

const MobileNavigation: React.FC = () => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const { openModal } = useModalAction();
  const [isAuthorize] = useAtom(authorizationAtom);
  const [_, setDrawerView] = useAtom(drawerAtom);
  const isHomePage = useIsHomePage();
  const { isRTL } = useIsRTL();

  const [, setDisplayMobileHeaderSearch] = useAtom(
    displayMobileHeaderSearchAtom
  );
  const { totalUniqueItems } = useCart();

  function handleSidebar(view: string) {
    setDrawerView({ display: true, view: view });
  }

  function handleJoin() {
    return openModal('LOGIN_VIEW');
  }

  function toggleMobileSearch() {
    setDisplayMobileHeaderSearch((prev) => !prev);
  }

  return (
    <div className="visible lg:hidden h-12 md:h-14">
      <nav className="h-12 md:h-14 w-full py-1.5 px-2 flex justify-between fixed start-0 bottom-0 z-10 bg-light shadow-400">
        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={() => handleSidebar('MAIN_MENU_VIEW')}
          className="flex p-2 h-full items-center justify-center focus:outline-none focus:text-accent"
        >
          <span className="sr-only">{t('text-burger-menu')}</span>
          <NavbarIcon className={`${isRTL && 'transform rotate-180'}`} />
        </motion.button>

        {isHomePage && (
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={toggleMobileSearch}
            className="flex p-2 h-full items-center justify-center focus:outline-none focus:text-accent"
          >
            <span className="sr-only">{t('text-search')}</span>
            <SearchIcon width="17.05" height="18" />
          </motion.button>
        )}

        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={() => router.push('/')}
          className="flex p-2 h-full items-center justify-center focus:outline-none focus:text-accent"
        >
          <span className="sr-only">{t('text-home')}</span>
          <HomeIcon />
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={() => handleSidebar('cart')}
          className="flex p-2 product-cart h-full relative items-center justify-center focus:outline-none focus:text-accent"
        >
          <span className="sr-only">{t('text-cart')}</span>
          <ShoppingBagIcon />
          {totalUniqueItems > 0 && (
            <span className="bg-accent py-1 px-1.5 text-10px leading-none font-semibold text-light rounded-full absolute top-0 end-0 mt-0.5 -me-0.5">
              {totalUniqueItems}
            </span>
          )}
        </motion.button>

        {isAuthorize ? (
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={() => handleSidebar('AUTH_MENU_VIEW')}
            className="flex p-2 h-full items-center justify-center focus:outline-none focus:text-accent"
          >
            <span className="sr-only">{t('text-user')}</span>
            <UserIcon />
          </motion.button>
        ) : (
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={handleJoin}
            className="flex p-2 h-full items-center justify-center focus:outline-none focus:text-accent"
          >
            <span className="sr-only">{t('text-user')}</span>
            <UserIcon />
          </motion.button>
        )}
      </nav>
    </div>
  );
};

export default MobileNavigation;
