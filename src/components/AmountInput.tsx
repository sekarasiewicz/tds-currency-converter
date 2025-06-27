import { useRef } from 'react';
import type { ControllerRenderProps } from 'react-hook-form';
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type { FormSchema } from '@/lib/formSchema';
import { debounce } from '@/lib/utils';

type AmountInputProps = {
  field: ControllerRenderProps<FormSchema, 'amount'>;
  disabled?: boolean;
};

export function AmountInput({ field, disabled }: AmountInputProps) {
  const debouncedOnChange = useRef(
    debounce<string[]>((value) => {
      field.onChange(value === '' ? 0.01 : Number(value));
    }, 300),
  );

  return (
    <FormItem>
      <FormLabel>Amount</FormLabel>
      <FormControl>
        <Input
          defaultValue={field.value}
          type="number"
          min={0.01}
          step={0.01}
          onChange={(e) => {
            debouncedOnChange.current(e.target.value);
          }}
          disabled={disabled}
        />
      </FormControl>
      <FormDescription>Enter the amount to convert.</FormDescription>
      <FormMessage />
    </FormItem>
  );
}
