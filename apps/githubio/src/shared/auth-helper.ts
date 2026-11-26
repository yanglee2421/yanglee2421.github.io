import {
  BehaviorSubject,
  filter,
  firstValueFrom,
  map,
  Subject,
  Subscription,
} from "rxjs";

type AuthStatus = "authenicated" | "unauthenicated" | "unknown";

interface AuthState {
  status: AuthStatus;
}

type AuthEventName =
  | "sign-in"
  | "sign-out"
  | "refresh-resolve"
  | "refresh-reject"
  | "refresh-fail";

interface AuthEvent {
  name: AuthEventName;
}

export class AuthHelper {
  private $state: BehaviorSubject<AuthState>;
  private subscriptions: Subscription;
  private $event: Subject<AuthEvent>;

  constructor() {
    this.$state = new BehaviorSubject({});
    this.subscriptions = new Subscription(() => {
      this.$state.complete();
    });
  }
  dispose() {
    this.subscriptions.unsubscribe();
  }

  signIn() {
    this.$state.next({ status: "authenicated" });
    this.$event.next({ name: "sign-in" });
  }
  signOut() {
    this.$state.next({ status: "unauthenicated" });
    this.$event.next({ name: "sign-out" });
  }
  refreshReject() {
    this.$state.next({ status: "unauthenicated" });
    this.$event.next({ name: "refresh-reject" });
  }
  refreshResolve() {
    this.$state.next({ status: "authenicated" });
    this.$event.next({ name: "refresh-resolve" });
  }
  refreshFail() {
    this.$state.next({ status: "unknown" });
    this.$event.next({ name: "refresh-fail" });
  }

  valid() {
    const $ = this.$state.pipe(
      filter((s) => s.status !== "unknown"),
      map((s) => s.status),
    );

    return firstValueFrom($);
  }
}

const fakeRequest = async (signal: AbortSignal, url: URL) => {
  const res = await fetch(url, { signal });
  await res.json();
};

export class AuthAction {
  private promise: Promise<void> | null = null;
  private controller: AbortController | null = null;
  private promiseType: "refresh" | "sign-in" | "sign-out" | "" = "";

  constructor() {}
  dispose() {}

  private doRefresh() {
    this.controller?.abort();

    this.controller = new AbortController();
    this.promiseType = "refresh";
    const url = new URL("/mock/auth/refresh", "http://localhost:3000");
    this.promise = fakeRequest(this.controller.signal, url).finally(() => {
      this.controller = null;
      this.promiseType = "";
      this.promise = null;
    });
  }
  private doSignIn() {
    this.controller?.abort();

    this.controller = new AbortController();
    this.promiseType = "sign-in";
    const url = new URL("/mock/auth/sign-in", "http://localhost:3000");
    this.promise = fakeRequest(this.controller.signal, url).finally(() => {
      this.controller = null;
      this.promiseType = "";
      this.promise = null;
    });
  }
  private doSignOut() {
    this.controller?.abort();

    this.controller = new AbortController();
    this.promiseType = "sign-out";
    const url = new URL("/mock/auth/sign-in", "http://localhost:3000");
    this.promise = fakeRequest(this.controller.signal, url).finally(() => {
      this.controller = null;
      this.promiseType = "";
      this.promise = null;
    });
  }

  signIn() {
    if (this.promiseType !== "sign-in") {
      this.doSignIn();
    }

    if (!this.promise) {
      this.doSignIn();
    }

    return this.promise!;
  }
  signOut() {
    if (this.promiseType !== "sign-out") {
      this.doSignOut();
    }

    if (!this.promise) {
      this.doSignOut();
    }

    return this.promise!;
  }
  refresh() {
    if (this.promiseType !== "refresh") {
      this.doRefresh();
    }

    if (!this.promise) {
      this.doRefresh();
    }

    return this.promise!;
  }
}
