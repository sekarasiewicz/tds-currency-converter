import { useMemo } from 'react';
import type {
  ControllerRenderProps,
  FieldPath,
  FieldValues,
} from 'react-hook-form';
import type { Currency } from '@/services/currencyService';
import { FormControl, FormItem, FormLabel, FormMessage } from './ui/form';

type CurrencySelectorProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  label: string;
  options: Currency[];
  disabled?: boolean;
  field: ControllerRenderProps<TFieldValues, TName>;
};

export function CurrencySelector<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  label,
  options,
  disabled,
  field,
}: CurrencySelectorProps<TFieldValues, TName>) {
  const sortedOptions = useMemo(
    () => [...options].sort((a, b) => a.short_code.localeCompare(b.short_code)),
    [options],
  );

  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <select
          className="w-full border rounded-md px-3 py-2 text-sm"
          aria-label={label}
          value={field.value}
          onChange={field.onChange}
          disabled={disabled}
        >
          <option value="" disabled>
            Select currency
          </option>
          {sortedOptions.map((cur) => (
            <option
              key={`${cur.short_code}-${cur.name}`}
              value={cur.short_code}
            >
              {cur.short_code} - {cur.name}
            </option>
          ))}
        </select>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}
