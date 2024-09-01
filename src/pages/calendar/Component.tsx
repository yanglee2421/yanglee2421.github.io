import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { Calendar } from "./Calendar";

export function Component() {
  return (
    <>
      <title>Calendar</title>
      <QueryErrorResetBoundary>
        {({ reset }) => {
          return (
            <ErrorBoundary
              onReset={reset}
              fallbackRender={({ error, resetErrorBoundary }) => {
                return (
                  <div>
                    <p>{error.message}</p>
                    <button onClick={resetErrorBoundary}>reset</button>
                  </div>
                );
              }}
            >
              <React.Suspense>
                <Calendar />
              </React.Suspense>
            </ErrorBoundary>
          );
        }}
      </QueryErrorResetBoundary>
    </>
  );
}
