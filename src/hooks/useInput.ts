import { ChangeEvent, useState } from 'react';

type ReturnType<T> = [T, (event: ChangeEvent<HTMLInputElement>) => void];

export const useInput = (init: string = ''): ReturnType<string> => {
  const [value, setValue] = useState<string>(init);

  const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    console.log('이벤트', event);

    setValue(event.target.value);
  };

  return [value, onChange];
};
