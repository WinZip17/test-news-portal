import AdminBro from 'admin-bro';
import { fsCreateFile } from 'src/file/file.service';

const after = async (response, request, context) => {
  const { record, uploadImage } = context;
  if (record.isValid() && uploadImage) {
    const image = fsCreateFile('image', uploadImage);
    await record.update({ image });
  }
  return response;
};

const before = async (request, context) => {
  if (request.method === 'post') {
    const { uploadImage, ...otherParams } = request.payload;
    context.uploadImage = uploadImage;
    return { ...request, payload: otherParams };
  }
  return request;
};

module.exports = { before, after };
