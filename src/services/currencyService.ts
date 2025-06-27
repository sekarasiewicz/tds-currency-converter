function getApiKey(): string {
  return import.meta.env.VITE_CURRENCY_API_KEY as string;
}
const BASE_URL = 'https://api.currencybeacon.com/v1/';

async function fetchCurrencyApi<T>(endpoint: string): Promise<T> {
  const apiKey = getApiKey();
  if (!apiKey)
    throw new Error(
      'API key is missing. Set VITE_CURRENCY_API_KEY in your .env file.',
    );
  const res = await fetch(endpoint);
  if (!res.ok) throw new Error('Failed to fetch from currency API');
  return res.json() as Promise<T>;
}

export type ConvertCurrencyResponse = {
  value?: number;
  error?: { message: string };
};

export async function convertCurrencyService(
  fromCurrency: string,
  toCurrency: string,
  amount: number,
): Promise<number> {
  const apiKey = getApiKey();
  const endpoint = `${BASE_URL}convert?api_key=${apiKey}&from=${fromCurrency}&to=${toCurrency}&amount=${amount}`;
  const data: ConvertCurrencyResponse = await fetchCurrencyApi(endpoint);

  if (typeof data.value !== 'number')
    throw new Error(data.error?.message || 'Malformed conversion response');
  return data.value;
}

export type Currency = {
  short_code: string;
  name: string;
  symbol: string;
};

export async function fetchCurrenciesService() {
  const apiKey = getApiKey();
  const endpoint = `${BASE_URL}currencies?api_key=${apiKey}`;
  const data = await fetchCurrencyApi<{ response: Currency[] }>(endpoint);
  return data.response;
}
