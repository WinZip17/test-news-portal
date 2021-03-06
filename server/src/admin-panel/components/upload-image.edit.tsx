import React from 'react';

import {
  Box,
  DropZone,
  Label,
  DropZoneProps,
  DropZoneItem,
} from '@admin-bro/design-system';

import { BasePropertyProps } from 'admin-bro';

const UploadImageEdit: React.FC<BasePropertyProps> = (props) => {
  const { property, record, onChange } = props;

  const onUpload: DropZoneProps['onChange'] = (files: File[]) => {
    const newRecord = { ...record };
    const file = files.length && files[0];

    console.log('onChange', {
      ...newRecord,
      params: {
        ...newRecord.params,
        [property.name]: file,
      },
    });
    onChange({
      ...newRecord,
      params: {
        ...newRecord.params,
        [property.name]: file,
      },
    });
    event.preventDefault();
  };

  const uploadedPhoto = record.params.profilePhotoLocation;
  const photoToUpload = record.params[property.name];

  return (
    <Box>
      <Label>{property.label}</Label>
      {record.params.image && (
        <div>
          <p>Current:</p>
          <img src={`/${record.params.image}`} alt="" />
        </div>
      )}
      <div>
        <p>Change(add):</p>
        <DropZone
          onChange={onUpload}
          validate={{ mimeTypes: ['image/png', 'image/jpg', 'image/jpeg'] }}
        />
        {uploadedPhoto && !photoToUpload && (
          <DropZoneItem src={uploadedPhoto} />
        )}
      </div>
    </Box>
  );
};

export default UploadImageEdit;
