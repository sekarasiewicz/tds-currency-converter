import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { convertCurrencyService } from './currencyService';

const OLD_ENV = { ...import.meta.env };

describe('convertCurrencyService', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    import.meta.env.VITE_CURRENCY_API_KEY = 'test-key';
  });

  it('returns the converted value on success', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ value: 123.45 }),
      }),
    );
    const result = await convertCurrencyService('USD', 'EUR', 100);
    expect(result).toBe(123.45);
  });

  it('throws an error if API returns error', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ error: { message: 'API error' } }),
      }),
    );
    await expect(convertCurrencyService('USD', 'EUR', 100)).rejects.toThrow(
      'API error',
    );
  });

  it('throws an error if API key is missing', async () => {
    import.meta.env.VITE_CURRENCY_API_KEY = '';
    await expect(convertCurrencyService('USD', 'EUR', 100)).rejects.toThrow(
      'API key is missing',
    );
  });

  it('throws an error if fetch fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }));
    await expect(convertCurrencyService('USD', 'EUR', 100)).rejects.toThrow(
      'Failed to fetch from currency API',
    );
  });

  afterAll(() => {
    import.meta.env.VITE_CURRENCY_API_KEY = OLD_ENV.VITE_CURRENCY_API_KEY;
  });
});
