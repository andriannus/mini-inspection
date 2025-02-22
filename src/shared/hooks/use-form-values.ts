import type { FieldValues } from 'react-hook-form';
import { useFormContext, useWatch } from 'react-hook-form';

export function useFormValues<T extends FieldValues>() {
  const { getValues } = useFormContext<T>();

  return {
    ...useWatch(),
    ...getValues(),
  };
}
