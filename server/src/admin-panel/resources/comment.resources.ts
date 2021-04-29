import AdminBro from 'admin-bro';
import { baseNavigation } from '../admin-panel.plugin';
import { User } from 'src/users/entities/user.entity';
import {Comment} from "../../news/entities/comment.entity";

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

const CommentResources = {
  resource: Comment,
  options: {
    navigation: baseNavigation,
    properties: {
      NewsId: {
        isVisible: false,
      },
    },
  },
};

export default CommentResources;
