// src/utils/globalErrorHandlers.ts
export function setupGlobalErrorHandlers() {
  window.addEventListener("error", (event) => {
    console.error(
      JSON.stringify({
        event: "window_error",
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        timestamp: new Date().toISOString(),
      }),
    );
  });

  window.addEventListener("unhandledrejection", (event) => {
    console.error(
      JSON.stringify({
        event: "unhandled_promise_rejection",
        reason:
          event.reason instanceof Error
            ? event.reason.message
            : String(event.reason),
        timestamp: new Date().toISOString(),
      }),
    );
  });
}
