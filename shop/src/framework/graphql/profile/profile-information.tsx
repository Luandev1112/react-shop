import { useUpdateCustomerMutation } from '@framework/auth/auth.graphql';
import { toast } from 'react-toastify';
import { useTranslation } from 'next-i18next';
import ProfileForm from '@components/profile/profile-form';
import useUser from '@framework/auth/use-user';

const ProfileInformation = () => {
  const { t } = useTranslation('common');
  const { me } = useUser();
  const [updateProfile, { loading: updating }] = useUpdateCustomerMutation({
    onCompleted: (data) => {
      if (data?.updateUser?.id) {
        toast.success(t('profile-update-successful'));
      }
    },
    onError: (err) => {
      toast.error(t('error-something-wrong'));
    },
  });

  async function onSubmit(values: any) {
    // alert('Sorry the mutation is disable for demo!');
    if (!me) {
      return false;
    }
    updateProfile({
      variables: {
        input: {
          id: me.id!,
          name: values.name,
          profile: {
            upsert: {
              id: me?.profile?.id,
              ...values.profile,
              avatar: values.profile.avatar?.[0],
            },
          },
        },
      },
    });
  }

  return <ProfileForm loading={updating} onSubmit={onSubmit} user={me!} />;
};

export default ProfileInformation;
