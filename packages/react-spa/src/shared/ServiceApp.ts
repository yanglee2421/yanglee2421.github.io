class ServiceAppContext<TContext extends {}> {
  private context: TContext;

  constructor(context: TContext) {
    this.context = context;
  }

  set<TNewContext extends {}>(context: TNewContext) {
    this.context = { ...this.context, ...context };

    return this as unknown as ServiceAppContext<TContext & TNewContext>;
  }
  get(): TContext {
    return this.context;
  }
}

export class ServiceApp<TAppContext extends {}> {
  private context: ServiceAppContext<TAppContext>;

  constructor(context: ServiceAppContext<TAppContext>) {
    this.context = context;
  }

  use<TReturn>(fn: (c: ServiceAppContext<TAppContext>) => TReturn) {
    void fn(this.context);

    return this as unknown as TReturn extends ServiceAppContext<infer Context>
      ? ServiceApp<Context>
      : ServiceApp<TAppContext>;
  }
}

const app = new ServiceApp(new ServiceAppContext({}))
  .use((c) => {
    return c.set({ name: "yanglee2421.github.io" });
  })
  .use((c) => {
    console.log(c);

    return c.set({ version: "1.0.0" });
  });

void app;
