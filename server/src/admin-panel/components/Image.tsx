const React = require('react');

// import {
//   BasePropertyProps,
//   Box,
//   DropZone,
//   Label,
//   OnDropZoneChange,
// } from 'admin-bro';

const adminBro = require('admin-bro');
const Image = (props): JSX.Element => {
  console.log('props', props);
  console.log('props.record.params.image', props.record.params.image);

  const { property, record, onChange } = props;
  //
  // const onUpload = (files: File[]) => {
  //   const newRecord = { ...record };
  //   onChange({
  //     ...newRecord,
  //     params: {
  //       ...newRecord.params,
  //       [property.name]: files,
  //     },
  //   });
  //   event.preventDefault();
  // };

  return (
    <div>fjrkifjrei</div>
  )
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

export default Image;
