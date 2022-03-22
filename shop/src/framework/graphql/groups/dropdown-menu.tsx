import { GroupsMenu } from '@components/layouts/menu/groups-menu';
import useHomepage from '@framework/utils/use-homepage';
import { useGroupsQuery } from './groups.graphql';

const GroupsDropdownMenu = () => {
  const { data } = useGroupsQuery();
  const { homePage } = useHomepage();
  return <GroupsMenu groups={data?.types!} defaultGroup={homePage!} />;
};

export default GroupsDropdownMenu;
