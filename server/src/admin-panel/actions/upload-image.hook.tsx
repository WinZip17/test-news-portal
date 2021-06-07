import { fsCreateFile, fsRemoveFile } from 'src/file/file.service';

const block = (entity): string | null => {
  switch (entity) {
    case 'image':
      return 'newsImage';
    case 'avatar':
      return 'Avatar';
    default:
      return null;
  }
};

const after = async (response, request, context, entity) => {
  const workImage = block(entity) ? context[block(entity)] : null;
  const { record } = context;
  if (block(entity) && record.isValid() && workImage) {
    // если картинка была, предыдущую удалить
    if (record.params.image) {
      fsRemoveFile(record.params.image);
    }
    const createFile = fsCreateFile('image', workImage, true);
    await record.update({ [entity]: createFile });
  }
  return response;
};

const before = async (request, context, entity) => {
  if (request.method === 'post') {
    const paramName = block(entity);
    const workImage = request.payload[paramName];
    delete request.payload[paramName];
    const { ...otherParams } = request.payload;
    context[paramName] = workImage;
    return { ...request, payload: otherParams };
  }
  return request;
};

module.exports = { before, after };
