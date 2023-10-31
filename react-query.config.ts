import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 30, // 30seconds
      cacheTime: 1000 * 30,
      refetchOnMount: "always",
      refetchOnWindowFocus: "always",
      refetchOnReconnect: "always",
      refetchInterval: 1000 * 30,
      refetchIntervalInBackground: false,
      suspense: false,
    },
    mutations: {
      retry: 2
    }
  },
});

export { queryClient, QueryClientProvider };
