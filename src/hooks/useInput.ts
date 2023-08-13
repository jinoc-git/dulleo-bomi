import { ChangeEvent, useState } from 'react';

type UseInput<T> = [T, (e: ChangeEvent<HTMLInputElement>) => void];

export function useTextInput<T>(init: T): UseInput<T> {
  const [value, setValue] = useState<T>(init);

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setValue(value as T);
  };

  return [value, onChange];
}
