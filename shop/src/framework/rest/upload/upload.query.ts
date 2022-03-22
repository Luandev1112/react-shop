import { CoreApi } from '@framework/utils/core-api';
import { API_ENDPOINTS } from '@framework/utils/endpoints';
import { useMutation } from 'react-query';

const UploadService = new CoreApi(API_ENDPOINTS.UPLOAD);

export const useUploadMutation = () => {
  return useMutation((input: any) => {
    let formData = new FormData();
    input.forEach((attachment: any) => {
      formData.append('attachment[]', attachment);
    });
    return UploadService.create(formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  });
};
