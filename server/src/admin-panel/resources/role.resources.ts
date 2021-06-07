import { baseNavigation } from '../admin-panel.plugin';
import { Role } from '../../users/entities/role.entity';

const RoleResources = () => ({
  resource: Role,
  options: {
    navigation: baseNavigation,
  },
});

export default RoleResources;
