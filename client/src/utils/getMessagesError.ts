// TODO: ошибки валидации class-validator приходят массивом, HttpException строкой..
const getMessagesError = (message: string | string[]) => {
  if (typeof message === 'string') {
    return [message];
  }
  return message;
};

export default getMessagesError;
