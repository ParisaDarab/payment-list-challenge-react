import { I18N } from "./constants/i18n";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { PaymentsPage } from "./components/PaymentsPage";

// This is required for tests to pass if ReactQuery is used
// you don't have to use this library in your solution.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // retry failed requests once
      refetchOnWindowFocus: false, // avoid noisy refetches during a demo/interview
      staleTime: 30_000, // data is "fresh" for 30s, no refetch needed in that window
    },
  },
  queryCache: new QueryCache({
    onError: (_error, query) => {
      console.error(
        JSON.stringify({ event: "query_failed", queryKey: query.queryKey }),
      );
    },
    onSuccess: (_data, query) => {
      console.info(
        JSON.stringify({ event: "query_succeeded", queryKey: query.queryKey }),
      );
    },
  }),
});
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">
              {I18N.APP_TITLE}
            </h1>
          </div>
        </header>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <PaymentsPage />
        </main>
      </div>
    </QueryClientProvider>
  );
}

export default App;
