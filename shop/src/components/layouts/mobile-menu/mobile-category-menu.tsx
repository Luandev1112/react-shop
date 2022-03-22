import DrawerWrapper from '@components/ui/drawer/drawer-wrapper';
import Categories from '@framework/categories/categories';

export default function MobileCategoryMenu() {
  return (
    <DrawerWrapper>
      <div className="h-full max-h-full overflow-hidden">
        <Categories layout="classic" className="!block" />
      </div>
    </DrawerWrapper>
  );
}
