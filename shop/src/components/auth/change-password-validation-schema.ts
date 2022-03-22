import * as yup from 'yup';

export interface FormValues {
  oldPassword: string;
  newPassword: string;
  passwordConfirmation: string;
}
export const changePasswordSchema = yup.object().shape({
  oldPassword: yup.string().required('error-old-password-required'),
  newPassword: yup.string().required('error-new-password-required'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'error-match-passwords')
    .required('error-confirm-password'),
});
