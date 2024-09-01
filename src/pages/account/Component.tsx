import { QueryErrorResetBoundary } from "@tanstack/react-query";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Account } from "./Account";
import { AuthGuard } from "@/components/guard/AuthGuard";

export function Component() {
  return (
    <AuthGuard>
      <title>Account Settings</title>
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
                <Account />
              </React.Suspense>
            </ErrorBoundary>
          );
        }}
      </QueryErrorResetBoundary>
    </AuthGuard>
  );
}
