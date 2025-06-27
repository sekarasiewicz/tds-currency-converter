import { Spinner } from './ui/spinner';

type ConversionResultProps = {
  loading: boolean;
  error: string | null;
  result: number | null;
  toCurrencyCode: string;
};

export function ConversionResult({
  loading,
  error,
  result,
  toCurrencyCode,
}: ConversionResultProps) {
  if (loading)
    return (
      <span className="flex items-center gap-2">
        <Spinner />
        Loading...
      </span>
    );
  if (error)
    return (
      <p className="text-destructive" role="alert">
        {error}
      </p>
    );
  if (result !== null) {
    const formatted = result.toLocaleString(undefined, {
      style: 'currency',
      currency: toCurrencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return (
      <output aria-live="polite" className="outline-none">
        Converted: {formatted}
      </output>
    );
  }
  return null;
}
