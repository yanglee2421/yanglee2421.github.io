import {
  QueryErrorResetBoundary,
  useSuspenseQuery,
} from "@tanstack/react-query";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";

export function Suspense() {
  return (
    <QueryErrorResetBoundary>
      {(resetValue) => {
        return (
          <ErrorBoundary
            onReset={() => {
              resetValue.reset();
            }}
            fallbackRender={(fallbackProps) => {
              return (
                <>
                  <p>{fallbackProps.error.message}</p>
                  <button
                    onClick={() => {
                      fallbackProps.resetErrorBoundary();
                    }}
                  ></button>
                </>
              );
            }}
          >
            <React.Suspense fallback={<p>loading...</p>}>
              <Page />
            </React.Suspense>
          </ErrorBoundary>
        );
      }}
    </QueryErrorResetBoundary>
  );
}

function Page() {
  const query = useSuspenseQuery({
    queryKey: ["suspense"],
    queryFn() {
      return Promise.resolve({ name: "asd" });
    },
  });

  return <>{query.data.name}</>;
}
