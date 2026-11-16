import {
  BehaviorSubject,
  firstValueFrom,
  Observable,
  Subscription,
  timer,
} from "rxjs";

const createToken = () => {
  return new Date().toLocaleString();
};

interface User {
  id: string;
  nickname?: string;
}

interface WhenType {
  at: { value: string };
  rt: { value: string };
  user: { value: User | null };
}

export class AuthClient {
  private readyPromise: Promise<void>;
  private refreshPromise: Promise<void> | null = null;
  private at$ = new BehaviorSubject("");
  private rt$ = new BehaviorSubject("");
  private user$ = new BehaviorSubject<User | null>(null);
  private subscriptions: Subscription[];

  constructor() {
    const s1 = this.rt$.subscribe((value) => {
      localStorage.setItem("refreshToken", value);
    });

    this.subscriptions = [s1];
    this.readyPromise = this.prepare();
  }
  dispose() {
    this.subscriptions.forEach((s) => s.unsubscribe());
    this.at$.complete();
    this.rt$.complete();
  }

  when<TKey extends keyof WhenType>(key: TKey) {
    type ReturnType = Observable<
      WhenType[TKey] extends { value: infer TValue } ? TValue : never
    >;

    switch (key) {
      case "at":
        return this.at$.asObservable() as ReturnType;
      case "rt":
        return this.rt$.asObservable() as ReturnType;
      case "user":
      default:
        return this.user$.asObservable() as ReturnType;
    }
  }

  get accessToken() {
    return this.at$.getValue();
  }
  get refreshToken() {
    return this.rt$.getValue();
  }
  get ready() {
    return this.readyPromise;
  }

  private async refreshAccessToken() {
    await firstValueFrom(timer(200));
    this.at$.next(createToken());
    this.rt$.next(createToken());
    this.user$.next({ id: "test user" });
  }
  private async prepare() {
    const rt = localStorage.getItem("refreshToken") || "";

    if (!rt) return;

    this.rt$.next(rt);
    console.log("request whoami");
    await firstValueFrom(timer(200));
    console.log("request whoami ok");
    this.at$.next(createToken());
    this.rt$.next(createToken());
    this.user$.next({ id: "test user" });
  }

  async refresh() {
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    try {
      this.refreshPromise = this.refreshAccessToken();
      await this.refreshPromise;
    } finally {
      this.refreshPromise = null;
    }
  }
  async signIn(): Promise<void> {
    await firstValueFrom(timer(200));
    this.at$.next(createToken());
    this.rt$.next(createToken());
    this.user$.next({ id: "test user" });
  }
  async signOut(): Promise<void> {
    await firstValueFrom(timer(200));
    this.at$.next("");
    this.rt$.next("");
    this.user$.next(null);
  }
}
export const authCLient = new AuthClient();
authCLient.when("user").subscribe(() => {});
