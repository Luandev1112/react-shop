import { siteSettings } from '@settings/site';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import DrawerWrapper from '@components/ui/drawer/drawer-wrapper';
import { useAtom } from 'jotai';
import { drawerAtom } from '@store/drawer-atom';

export default function MobileAuthorizedMenu() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [_, closeSidebar] = useAtom(drawerAtom);
  function handleClick(path: string) {
    router.push(path);
    closeSidebar({ display: false, view: '' });
  }
  return (
    <DrawerWrapper>
      <ul className="flex-grow">
        {siteSettings.authorizedLinks.map(({ href, label }) => (
          <li key={`${href}${label}`}>
            <span
              className="block py-3 px-5 md:px-8 text-sm font-semibold capitalize text-heading transition duration-200 hover:text-accent cursor-pointer"
              onClick={() => handleClick(href)}
            >
              {t(label)}
            </span>
          </li>
        ))}
      </ul>
    </DrawerWrapper>
  );
}
