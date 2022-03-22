import MobileCategoryMenu from '@components/layouts/mobile-menu/mobile-category-menu';
import { drawerAtom } from '@store/drawer-atom';
import { useAtom } from 'jotai';
import dynamic from 'next/dynamic';
import Drawer from './drawer';
const CartSidebarView = dynamic(
  () => import('@components/cart/cart-sidebar-view')
);
const MobileAuthorizedMenu = dynamic(
  () => import('@components/layouts/mobile-menu/mobile-authorized-menu')
);
const MobileMainMenu = dynamic(
  () => import('@components/layouts/mobile-menu/mobile-main-menu')
);

export default function ManagedDrawer() {
  const [{ display, view }, setDrawerState] = useAtom(drawerAtom);
  return (
    <Drawer
      open={display}
      onClose={() => setDrawerState({ display: false, view: '' })}
      variant={
        view === 'FILTER_VIEW' ||
        view === 'MAIN_MENU_VIEW' ||
        view === 'FILTER_LAYOUT_TWO_VIEW'
          ? 'left'
          : 'right'
      }
    >
      {view === 'cart' && <CartSidebarView />}
      {view === 'FILTER_VIEW' && <MobileCategoryMenu />}
      {view === 'MAIN_MENU_VIEW' && <MobileMainMenu />}
      {view === 'AUTH_MENU_VIEW' && <MobileAuthorizedMenu />}
    </Drawer>
  );
}
