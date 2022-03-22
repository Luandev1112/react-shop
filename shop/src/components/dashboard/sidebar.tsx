import Link from '@components/ui/link';
import { siteSettings } from '@settings/site';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import classNames from 'classnames';

type DashboardSidebarProps = {
  className?: string;
};

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ className }) => {
  const { t } = useTranslation();
  const { pathname } = useRouter();
  return (
    <aside
      className={classNames(
        'bg-light rounded border border-border-200 overflow-hidden',
        className
      )}
    >
      <ul className="py-8">
        {siteSettings.dashboardSidebarMenu
          ?.slice(0, -1)
          .map((item: any, idx) => (
            <li className="py-2" key={idx}>
              <Link
                href={item.href}
                className={classNames(
                  'block py-2 px-10 font-semibold text-heading transition-colors border-l-4 border-transparent hover:text-accent focus:text-accent',
                  {
                    'border-accent text-accent': pathname === item.href,
                  }
                )}
              >
                {t(item.label)}
              </Link>
            </li>
          ))}
      </ul>
      {/* End of top part menu */}

      <ul className="bg-light border-t border-border-200 py-4">
        {siteSettings.dashboardSidebarMenu?.slice(-1).map((item: any, idx) => (
          <li className="py-2" key={idx}>
            <Link
              href={item.href}
              className={classNames(
                'block py-2 px-10 font-semibold text-heading transition-colors hover:text-accent focus:text-accent',
                {
                  'border-l-4 border-accent text-accent':
                    pathname === item.href,
                }
              )}
            >
              {t(item.label)}
            </Link>
          </li>
        ))}
      </ul>
      {/* End of bottom part menu */}
    </aside>
  );
};

export default DashboardSidebar;
