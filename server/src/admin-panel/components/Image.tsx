const React = require('react');

const Image = (props): JSX.Element => {
  console.log('props', props);
  console.log('props.record.params.image', props.record.params.image);
  return (
    <div style={{ marginBottom: 15 }}>
      <h3>Image</h3>
      <img src={`http://localhost:3003/${props.record.params.image}`} alt="" />
    </div>
  );
};

export default Image;
