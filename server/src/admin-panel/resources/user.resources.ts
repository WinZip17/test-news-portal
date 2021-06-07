import AdminBro from 'admin-bro';
import { baseNavigation } from '../admin-panel.plugin';

const {
  after: uploadImageAfterHook,
  before: uploadImageBeforeHook,
} = require('../actions/upload-image.hook');

const afterUser = async (response, request, context) => {
  const modifiedResponse = await uploadImageAfterHook(
    response,
    request,
    context,
    'avatar',
  );
  return modifiedResponse;
};

const beforeUser = async (request, context) => {
  const modifiedResponse = await uploadImageBeforeHook(
    request,
    context,
    'avatar',
  );
  return modifiedResponse;
};

const UserResources = (db) => ({
  resource: db.sequelize.models.User.scope('full'),
  options: {
    navigation: baseNavigation,
    properties: {
      avatar: {
        isVisible: false,
      },
      Avatar: {
        components: {
          new: AdminBro.bundle('../components/upload-image.edit.tsx'),
          edit: AdminBro.bundle('../components/upload-image.edit.tsx'),
          list: AdminBro.bundle('../components/show-image.list.tsx'),
        },
      },
      password: {
        isVisible: false,
      },
    },
    actions: {
      new: {
        after: afterUser,
        before: beforeUser,
      },
      edit: {
        after: afterUser,
        before: beforeUser,
      },
      show: {
        isVisible: false,
      },
    },
  },
});

export default UserResources;
