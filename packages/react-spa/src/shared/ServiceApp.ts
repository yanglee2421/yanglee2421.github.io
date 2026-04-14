type Prettierify<T> = {
  [K in keyof T]: T[K];
} & {};

type ServiceAppContext<TContext extends {} = {}> = Readonly<TContext> & {
  set<TNewContext extends {}>(
    context: TNewContext,
  ): ServiceAppContext<Prettierify<TContext & TNewContext>>;
};

const ServiceAppContext: {
  new <TContext extends {} = {}>(
    context: TContext,
  ): ServiceAppContext<TContext>;
} = class {
  constructor(context: Record<string, unknown>) {
    Object.assign(this, context);
  }
  set(context: Record<string, unknown>) {
    Object.assign(this, context);
    return this;
  }
} as never;

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

  get() {
    return this.context as unknown as Readonly<Prettierify<TAppContext>>;
  }
}

const app = new ServiceApp(new ServiceAppContext({}))
  .use((c) => {
    return c.set({ name: "yanglee2421.github.io" });
  })
  .use((c) => {
    console.log(c.name); // 直接访问，有类型提示

    return c.set({ version: "1.0.0" });
  });

void app.get().version;
