import React from 'react';
// import adminBro from 'admin-bro';

import { Box, DropZone, Label, DropZoneProps } from '@admin-bro/design-system';

import { BasePropertyProps } from 'admin-bro';

const UploadImageEdit: React.FC<BasePropertyProps> = (props) => {
  console.log('props', props);
  console.log('props.record.params.image', props.record.params.image);

  const { property, record, onChange } = props;

  const onUpload: DropZoneProps['onChange'] = (files: File[]) => {

    // const newRecord = { ...record };
    // onChange({
    //   ...newRecord,
    //   params: {
    //     ...newRecord.params,
    //     [property.name]: files,
    //   },
    // });
    // event.preventDefault();
  };

  return (
    <Box>
      <Label>{property.label}</Label>

      <DropZone
        onChange={onUpload}
        validate={{ mimeTypes: ['image/png', 'image/jpg', 'image/jpeg'] }}
      />
    </Box>
  );
  // return (
  //   <Box>
  //     <Label>{property.label}</Label>
  //     <img src={`http://localhost:3003/${record.params.image}`} alt="" />
  //
  //     <DropZone
  //       multiple
  //       onChange={onUpload}
  //       validate={{ mimeTypes: ['image/png', 'image/jpg', 'image/jpeg'] }}
  //     />
  //   </Box>
  // );
};

export default UploadImageEdit;
