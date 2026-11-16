import {
  BehaviorSubject,
  filter,
  firstValueFrom,
  map,
  Observable,
  Subject,
  Subscription,
  tap,
  timer,
} from "rxjs";

type AuthStatus = "authenicated" | "unauthenicated" | "unknown";

interface User {
  id: string;
  nickname?: string;
}

interface AuthState {
  at: string;
  rt: string;
  status: AuthStatus;
  user: User | null;
}

interface WhenType {
  signIn: {
    value: null;
  };
  signOut: {
    value: null;
  };
  state: {
    value: AuthState;
  };
}

const createToken = () => {
  return new Date().toLocaleString();
};

const serverSideAuth = async (rt: string) => {
  void rt;

  const $ = timer(200).pipe(
    map(() => {
      return {
        at: createToken(),
        rt: createToken(),
        status: "authenicated",
        user: { id: crypto.randomUUID() },
      } satisfies AuthState;
    }),
  );

  return firstValueFrom($);
};

export class AuthClient {
  private refreshPromise: Promise<AuthState> | null = null;
  private signIn$: Subject<null> = new Subject();
  private signOut$: Subject<null> = new Subject();
  private state$: BehaviorSubject<AuthState>;
  private subscriptions: Subscription[];

  constructor() {
    const rt = localStorage.getItem("refreshToken") || "";
    const initialState: AuthState = this.createInitalState(rt);
    this.state$ = new BehaviorSubject(initialState);

    const s1 = this.state$.subscribe((state) => {
      localStorage.setItem("refreshToken", state.rt);
    });

    this.subscriptions = [s1];
  }
  dispose() {
    this.subscriptions.forEach((s) => s.unsubscribe());
    this.state$.complete();
    this.signIn$.complete();
    this.signOut$.complete();
  }

  when<TKey extends keyof WhenType>(key: TKey) {
    type ValueType = WhenType[TKey] extends { value: infer TValue }
      ? TValue
      : never;
    type ReturnType = Observable<ValueType>;

    switch (key) {
      case "signIn":
        return this.signIn$.asObservable() as ReturnType;
      case "signOut":
        return this.signOut$.asObservable() as ReturnType;
      case "state":
      default:
        return this.state$.asObservable() as ReturnType;
    }
  }

  get accessToken() {
    return this.state$.getValue().at;
  }
  get refreshToken() {
    return this.state$.getValue().rt;
  }
  get status() {
    return this.state$.getValue().status;
  }

  private createInitalState(rt: string): AuthState {
    if (rt) {
      return {
        at: "",
        rt,
        status: "unknown",
        user: null,
      };
    }

    return {
      at: "",
      rt: "",
      status: "unauthenicated",
      user: null,
    };
  }

  async refresh() {
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    try {
      this.refreshPromise = serverSideAuth(this.refreshToken);
      const result = await this.refreshPromise;
      // Unknown or Authenicated to Authenicated
      this.state$.next(result);
    } catch (error) {
      if (error instanceof Error) {
        // Authenicated to Unknown
        this.state$.next({
          ...this.state$.getValue(),
          status: "unknown",
        });
      } else {
        // Authenicated to Unauthenicated
        const emptyState = this.createInitalState("");
        this.state$.next(emptyState);
      }
    } finally {
      this.refreshPromise = null;
    }
  }
  async signIn(): Promise<void> {
    const result = await serverSideAuth(this.refreshToken);
    this.state$.next(result);
    this.signIn$.next(null);
  }
  async signOut(): Promise<void> {
    await firstValueFrom(timer(200));
    const emptyState = this.createInitalState("");
    this.state$.next(emptyState);
    this.signOut$.next(null);
  }
  waitForResolved() {
    const $ = this.state$.pipe(
      tap((state) => {
        if (state.status !== "unknown") {
          return;
        }
        this.refresh();
      }),
      filter((state) => state.status !== "unknown"),
    );

    return firstValueFrom($);
  }
}
export const authClient = new AuthClient();
