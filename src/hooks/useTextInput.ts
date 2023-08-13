import { ChangeEvent, useCallback, useState } from 'react';

type UseInput<T> = [T, (e: ChangeEvent<HTMLInputElement>) => void];

export function useTextInput<T>(init: T): UseInput<T> {
  const [value, setValue] = useState<T>(init);

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    const targetValue = e.target.value;
    setValue(targetValue as T);
  }, []);

  return [value, onChange];
}
