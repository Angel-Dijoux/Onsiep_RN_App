import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 60 * 1000,
      retry: 3,
    },
  },
});

export { queryClient, QueryClientProvider };
