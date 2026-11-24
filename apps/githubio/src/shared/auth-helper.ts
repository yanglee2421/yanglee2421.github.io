import {
  BehaviorSubject,
  filter,
  firstValueFrom,
  from,
  map,
  Subject,
  Subscription,
  tap,
  timer,
} from "rxjs";
import { exhaustSwitch } from "./exhaust-switch";

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

const fakeRequest = (reason: string) => {
  const $ = timer(200).pipe(
    tap(() => {
      console.log(reason);
    }),
  );

  return firstValueFrom($);
};

export class AuthAction {
  private $task: Subject<string>;
  private subscriptions: Subscription;

  constructor() {
    this.$task = new Subject();
    this.subscriptions = new Subscription(() => {
      this.$task.complete();
    });

    const s1 = this.$task
      .pipe(exhaustSwitch((reason) => from(fakeRequest(reason))))
      .subscribe(() => {});
    this.subscriptions.add(s1);
  }
  dispose() {
    this.subscriptions.unsubscribe();
  }

  signIn() {}
  signOut() {}
  refresh() {}
}
