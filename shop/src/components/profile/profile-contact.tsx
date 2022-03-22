import { PlusIcon } from '@components/icons/plus-icon';
import Card from '@components/ui/cards/card';
import ContactCard from '@components/ui/contact-card';
import { useModalAction } from '@components/ui/modal/modal.context';
import { useTranslation } from 'next-i18next';

interface Props {
  userId: string;
  profileId: string;
  contact: string;
}

const ProfileContact = ({ userId, profileId, contact }: Props) => {
  const { openModal } = useModalAction();
  const { t } = useTranslation('common');

  function onAdd() {
    openModal('ADD_OR_UPDATE_PROFILE_CONTACT', {
      customerId: userId,
      profileId,
      contact,
    });
  }
  return (
    <Card className="w-full flex flex-col">
      <div className="flex items-center justify-between mb-5 md:mb-8">
        <p className="text-lg lg:text-xl text-heading capitalize">
          {t('text-contact-number')}
        </p>

        {onAdd && (
          <button
            className="flex items-center text-sm font-semibold text-accent transition-colors duration-200 focus:outline-none focus:text-accent-hover hover:text-accent-hover"
            onClick={onAdd}
          >
            <PlusIcon className="w-4 h-4 stroke-2 me-0.5" />
            {Boolean(contact) ? t('text-update') : t('text-add')}
          </button>
        )}
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        <ContactCard
          number={Boolean(contact) ? contact : t('text-no-contact')}
        />
      </div>
    </Card>
  );
};

export default ProfileContact;
