export class FileQuery<TData = unknown> {
  result: QueryResult<TData> = {
    isPending: true,
    isError: false,
    isSuccess: false,
    error: null,
    data: null,
  };
  abortController = new AbortController();
  subscribeStack = new Set<SubscribeParams<TData>>();

  subscribe(subscribeParams: SubscribeParams<TData>) {
    this.subscribeStack.add(subscribeParams);

    return () => {
      this.subscribeStack.delete(subscribeParams);
    };
  }

  dispatch() {
    this.subscribeStack.forEach((item) => item.trigger());
  }

  async fetch(queryFn?: QueryFn<TData>) {
    const lastSubscribe = Array.from(this.subscribeStack.values()).at(0);

    if (!lastSubscribe) {
      return;
    }

    try {
      this.abortController = new AbortController();

      const fetchFn =
        typeof queryFn === "function" ? queryFn : lastSubscribe.queryFn;

      const data = await fetchFn({ signal: this.abortController?.signal });

      this.result = {
        isPending: false,
        isError: false,
        isSuccess: true,
        error: null,
        data,
      };
    } catch (error) {
      if (error instanceof Error) {
        this.result = {
          isPending: false,
          isError: true,
          isSuccess: false,
          error,
          data: this.result.data,
        };
      }
    } finally {
      this.dispatch();
    }
  }

  cancelFetch() {
    this.abortController.abort();
  }
}

type SubscribeParams<TData> = {
  queryFn: QueryFn<TData>;
  trigger(): void;
};

type QueryFn<TData> = ({ signal }: { signal: AbortSignal }) => Promise<TData>;

type QueryResult<TData> =
  | PendingResult
  | ErrorResult<TData>
  | SuccessResult<TData>;

type PendingResult = {
  isPending: true;
  isError: false;
  isSuccess: false;
  error: null;
  data: null;
};

type ErrorResult<TData> = {
  isPending: false;
  isError: true;
  isSuccess: false;
  error: Error;
  data: TData | null;
};

type SuccessResult<TData> = {
  isPending: false;
  isError: false;
  isSuccess: true;
  error: null;
  data: TData;
};
