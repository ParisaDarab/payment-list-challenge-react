import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

async function enableMocking() {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  try {
    const { worker } = await import("./mocks/browser");
    await worker.start();
    console.log("Mock Service Worker started");
  } catch (error) {
    console.error("Failed to start Mock Service Worker:", error);
  }
}
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // retry failed requests once
      refetchOnWindowFocus: false, // avoid noisy refetches during a demo/interview
      staleTime: 30_000, // data is "fresh" for 30s, no refetch needed in that window
    },
  },
});
enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
});
