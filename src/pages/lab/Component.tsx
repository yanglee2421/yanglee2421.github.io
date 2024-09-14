import { QueryErrorResetBoundary } from "@tanstack/react-query";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Deferred } from "./Deferred";

export function Component() {
  return (
    <>
      <title>Charts</title>

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
              <React.Suspense fallback={<div>loading</div>}>
                <Deferred />
              </React.Suspense>
            </ErrorBoundary>
          );
        }}
      </QueryErrorResetBoundary>
    </>
  );
}
