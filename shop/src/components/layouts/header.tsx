import Logo from '@components/ui/logo';
import cn from 'classnames';
import GroupsDropdownMenu from '@framework/groups/dropdown-menu';
import StaticMenu from './menu/static-menu';
import { useAtom } from 'jotai';
import { displayHeaderSearchAtom } from '@store/display-header-search-atom';
import { displayMobileHeaderSearchAtom } from '@store/display-mobile-header-search-atom';
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
import { authorizationAtom } from '@store/authorization-atom';
import { useIsHomePage } from '@lib/use-is-homepage';
import useLayout from '@framework/utils/use-layout';
import { useEffect } from 'react';
const Search = dynamic(() => import('@components/ui/search/search'));
const AuthorizedMenu = dynamic(() => import('./menu/authorized-menu'), {
  ssr: false,
});
const JoinButton = dynamic(() => import('./menu/join-button'), { ssr: false });

const Header = () => {
  const { t } = useTranslation('common');
  const { layout } = useLayout();
  const [displayHeaderSearch, setDisplayHeaderSearch] = useAtom(
    displayHeaderSearchAtom
  );
  const [displayMobileHeaderSearch] = useAtom(displayMobileHeaderSearchAtom);
  const [isAuthorize] = useAtom(authorizationAtom);
  const isHomePage = useIsHomePage();
  useEffect(() => {
    if (!isHomePage) {
      setDisplayHeaderSearch(false);
    }
  }, [isHomePage, setDisplayHeaderSearch]);
  const isFlattenHeader =
    !displayHeaderSearch && isHomePage && layout !== 'modern';
  return (
    <header
      className={cn('site-header-with-search h-14 md:h-16 lg:h-22', {
        'lg:!h-auto': isFlattenHeader,
      })}
    >
      <div
        className={cn(
          'flex justify-between items-center w-full h-14 md:h-16 lg:h-22 px-4 lg:px-8 py-5 z-50 fixed bg-light border-b border-border-200 shadow-sm transition-transform duration-300',
          {
            'lg:absolute lg:bg-transparent lg:shadow-none lg:border-0':
              isFlattenHeader,
          }
        )}
      >
        <div className="flex items-center w-full lg:w-auto">
          <Logo className="mx-auto lg:mx-0" />

          <div className="ms-10 me-auto hidden xl:block">
            <GroupsDropdownMenu />
          </div>
        </div>
        {isHomePage ? (
          <>
            {(displayHeaderSearch || layout === 'modern') && (
              <div className="hidden lg:block w-full xl:w-11/12 2xl:w-10/12 mx-auto px-10 overflow-hidden">
                <Search label={t('text-search-label')} variant="minimal" />
              </div>
            )}

            {displayMobileHeaderSearch && (
              <div className="block lg:hidden w-full absolute top-0 start-0 h-full bg-light pt-1.5 md:pt-2 px-5">
                <Search label={t('text-search-label')} variant="minimal" />
              </div>
            )}
          </>
        ) : null}
        <ul className="hidden lg:flex items-center flex-shrink-0 space-s-10">
          <StaticMenu />
          <li>{isAuthorize ? <AuthorizedMenu /> : <JoinButton />}</li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
