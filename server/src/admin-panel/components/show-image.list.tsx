import React from 'react';
import { BasePropertyProps } from 'admin-bro';
import { Box } from '@admin-bro/design-system';

const getKey = (resourceId: string): string => {
  switch (resourceId) {
    case 'Users':
      return 'avatar';
    case 'News':
      return 'image';
    default:
      return '';
  }
};

const Edit: React.FC<BasePropertyProps> = (props) => {
  const { record, property } = props;
  const fileKey = getKey(property.resourceId);
  const srcImg = `/${record.params[fileKey]}`;
  return <Box>{srcImg ? <img src={srcImg} width="100px" /> : 'no image'}</Box>;
};

export default Edit;
