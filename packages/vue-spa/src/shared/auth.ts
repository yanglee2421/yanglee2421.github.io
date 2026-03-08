import { promiseTry } from "@yotulee/run";

interface EventConstract {
  login: {
    args: [];
    return: void;
  };
  logout: {
    args: [];
    return: void;
  };
  redirectToLogin: {
    args: [];
    return: void;
  };
  redirectToHome: {
    args: [];
    return: void;
  };
}

interface EventConstract {
  isPendingChange: {
    args: [];
    return: void;
  };
}

type Handler<TKey extends keyof EventConstract> = EventConstract[TKey] extends {
  args: infer ArgsType;
  return: infer ReturnType;
}
  ? (...args: ArgsType extends unknown[] ? ArgsType : []) => ReturnType
  : never;

class AuthService {
  #isPending = false;
  #isPendingChangeListeners: Set<Handler<"isPendingChange">> = new Set();
  #role: "guest" | "auth" = "guest";
  #loginListeners: Set<Handler<"login">> = new Set();
  #logoutListeners: Set<Handler<"logout">> = new Set();
  #redirectToLoginListeners: Set<Handler<"redirectToLogin">> = new Set();
  #redirectToHomeListeners: Set<Handler<"redirectToHome">> = new Set();

  constructor() {}

  on<TKey extends keyof EventConstract>(event: TKey, handler: Handler<TKey>) {
    switch (event) {
      case "login":
        return;
      case "logout":
        return;
      case "redirectToLogin":
        return;
      case "redirectToHome":
        return;
      case "isPendingChange":
        return;
      default:
        const _: never = event;
        void _;
    }
  }
  Off<TKey extends keyof EventConstract>(event: TKey, handler: Handler<TKey>) {
    switch (event) {
      case "login":
        return;
      case "logout":
        return;
      case "redirectToLogin":
        return;
      case "redirectToHome":
        return;
      case "isPendingChange":
        return;
      default:
        const _: never = event;
        void _;
    }
  }

  async setIsPending(isPending: boolean) {
    if (this.#isPending === isPending) {
      return;
    }

    await Promise.allSettled(
      Array.from(this.#isPendingChangeListeners, promiseTry),
    );

    this.#isPending = isPending;
  }

  async login(implementsFn: () => void) {
    try {
      this.setIsPending(true);
      await promiseTry(implementsFn);

      await Promise.allSettled(
        Array.from(this.#loginListeners, (listener) => promiseTry(listener)),
      );

      this.#role = "auth";
      this.beforeEnterAuth();
      this.beforeEnterGuest();
    } catch (error) {
      console.error(error);
    } finally {
      this.setIsPending(false);
    }
  }
  async logout(implementsFn: () => void) {
    try {
      await promiseTry(implementsFn);
      this.#role = "guest";
    } catch (error) {
      console.error(error);
    }
  }
  async me(implementsFn: () => void) {
    try {
      this.setIsPending(true);
      await promiseTry(implementsFn);
      this.#role = "auth";
    } catch (error) {
      console.error(error);
      this.#role = "guest";
    } finally {
      this.setIsPending(false);
    }
  }
  async beforeEnterGuest() {
    if (this.#role === "guest") {
      return;
    }

    this.redirectToHome();
  }
  async beforeEnterAuth() {
    if (this.#role === "auth") {
      return;
    }

    this.redirectToLogin();
  }
  async redirectToLogin() {
    await Promise.allSettled(
      Array.from(this.#redirectToLoginListeners, promiseTry),
    );
  }
  async redirectToHome() {
    await Promise.allSettled(
      Array.from(this.#redirectToHomeListeners, promiseTry),
    );
  }
}

const authService = new AuthService();
authService.on("login", () => {});
