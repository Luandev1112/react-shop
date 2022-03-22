import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { siteSettings } from '@settings/site';
import Avatar from '@components/ui/avatar';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import cn from 'classnames';
import { avatarPlaceholder } from '@lib/placeholders';
import useUser from '@framework/auth/use-user';

export default function AuthorizedMenu() {
  const { me } = useUser();
  const router = useRouter();
  const { t } = useTranslation('common');

  function handleClick(path: string) {
    router.push(path);
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="flex items-center focus:outline-none">
        <Avatar
          src={me?.profile?.avatar?.thumbnail ?? avatarPlaceholder}
          title="user name"
        />
        <span className="sr-only">{t('user-avatar')}</span>
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          as="ul"
          className="absolute end-0 w-48 py-4 mt-1 origin-top-end bg-white rounded shadow-700 focus:outline-none"
        >
          {siteSettings.authorizedLinks.map(({ href, label }) => (
            <Menu.Item key={`${href}${label}`}>
              {({ active }) => (
                <li>
                  <button
                    onClick={() => handleClick(href)}
                    className={cn(
                      'block w-full py-2.5 px-6 text-sm text-start font-semibold capitalize text-heading transition duration-200 hover:text-accent focus:outline-none',
                      active ? 'text-accent' : 'text-heading'
                    )}
                  >
                    {t(label)}
                  </button>
                </li>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
