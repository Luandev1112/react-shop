import { Type } from '@framework/types';
import { CoreApi } from '@framework/utils/core-api';
import { API_ENDPOINTS } from '@framework/utils/endpoints';
import { useQuery } from 'react-query';

const GroupService = new CoreApi(API_ENDPOINTS.TYPE);
export const fetchGroups = async () => {
  const { data } = await GroupService.findAll();
  return { types: data as Type[] };
};
export const useGroupsQuery = () => {
  return useQuery<{ types: Type[] }, Error>(API_ENDPOINTS.TYPE, fetchGroups);
};

export const fetchGroup = async (slug: string) => {
  const { data } = await GroupService.findOne(slug);
  return { type: data };
};
export const useGroupQuery = (slug: string) => {
  return useQuery<{ type: Type }, Error>(
    [API_ENDPOINTS.TYPE, slug],
    () => fetchGroup(slug),
    { enabled: Boolean(slug) }
  );
};
