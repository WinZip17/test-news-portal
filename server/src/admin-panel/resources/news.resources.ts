import AdminBro from 'admin-bro';
import { baseNavigation } from '../admin-panel.plugin';
import { News } from '../../news/entities/news.entity';

const {
  after: uploadImageAfterHook,
  before: uploadImageBeforeHook,
} = require('../actions/upload-image.hook');

const afterNews = async (response, request, context) => {
  const modifiedResponse = await uploadImageAfterHook(
    response,
    request,
    context,
    'image',
  );
  return modifiedResponse;
};

const beforeNews = async (request, context) => {
  const modifiedResponse = await uploadImageBeforeHook(
    request,
    context,
    'image',
  );
  return modifiedResponse;
};

const NewsResources = {
  resource: News,
  options: {
    navigation: baseNavigation,
    properties: {
      content: { type: 'richtext' },
      image: {
        isVisible: false,
      },
      like: {
        isVisible: false,
      },
      dislike: {
        isVisible: false,
      },
      newsImage: {
        components: {
          new: AdminBro.bundle('../components/upload-image.edit.tsx'),
          edit: AdminBro.bundle('../components/upload-image.edit.tsx'),
          list: AdminBro.bundle('../components/show-image.list.tsx'),
        },
      },
    },
    actions: {
      new: {
        after: afterNews,
        before: beforeNews,
      },
      edit: {
        after: afterNews,
        before: beforeNews,
      },
      show: {
        isVisible: false,
      },
    },
  },
};

export default NewsResources;
