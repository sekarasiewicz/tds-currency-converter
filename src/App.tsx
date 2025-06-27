import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CurrencyConverter } from './pages/CurrencyConverter';

const queryClient = new QueryClient();

export default function AppWithProvider() {
  return (
    <QueryClientProvider client={queryClient}>
      <CurrencyConverter />
    </QueryClientProvider>
  );
}
