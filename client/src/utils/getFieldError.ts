import { FieldError } from 'react-hook-form';

export const getError = (data: FieldError | null) => {
  if (data && 'type' in data) {
    console.log(data);
    switch (data.type) {
      case 'required':
        return 'Поле обязательно';
      default:
        return data.message || 'Некорректное значение';
    }
  }
  return '';
};
