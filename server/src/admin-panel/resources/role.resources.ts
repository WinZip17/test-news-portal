import { baseNavigation } from '../admin-panel.plugin';
import { Role } from '../../users/entities/role.entity';

const RoleResources = (db) => ({
  resource: db.sequelize.models.Role,
  options: {
    navigation: baseNavigation,
  },
});

export default RoleResources;
