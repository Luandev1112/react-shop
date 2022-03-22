import Button from '@components/ui/button';
import Card from '@components/ui/cards/card';
import FileInput from '@components/ui/forms/file-input';
import Input from '@components/ui/forms/input';
import TextArea from '@components/ui/forms/text-area';
import { useTranslation } from 'next-i18next';
import pick from 'lodash/pick';
import { Form } from '@components/ui/forms/form';

interface Props {
  // user: User;
}

type UserFormValues = {
  // name?: User['name'];
  // profile?: User['profile'];
};

const ProfileForm: React.FC<any> = ({ user, loading, onSubmit }) => {
  const { t } = useTranslation('common');

  return (
    <Form<UserFormValues>
      onSubmit={onSubmit}
      options={{
        defaultValues: {
          ...(user &&
            pick(user, [
              'name',
              'profile.bio',
              // 'profile.contact',
              'profile.avatar',
            ])),
        },
      }}
    >
      {({ register, control }) => (
        <>
          <div className="flex mb-8">
            <Card className="w-full">
              <div className="mb-8">
                <FileInput control={control} name="profile.avatar" />
              </div>

              <div className="flex flex-row mb-6">
                <Input
                  className="flex-1"
                  label={t('text-name')}
                  {...register('name')}
                  variant="outline"
                />
              </div>

              <TextArea
                label={t('text-bio')}
                //@ts-ignore
                {...register('profile.bio')}
                variant="outline"
                className="mb-6"
              />

              <div className="flex">
                <Button
                  className="ms-auto"
                  loading={loading}
                  disabled={loading}
                >
                  {t('text-save')}
                </Button>
              </div>
            </Card>
          </div>
        </>
      )}
    </Form>
  );
};

export default ProfileForm;
