import * as url from "node:url";
import * as path from "node:path";
import { createServer } from "vite";
import React from "react";

const bootstrap = async () => {
  const server = await createServer({
    root: path.dirname(url.fileURLToPath(import.meta.url)),
    configFile: url.fileURLToPath(new URL("./vite.config.ts", import.meta.url)),
  });

  await server.listen();
  server.printUrls();
  server.bindCLIShortcuts({ print: true });
  // console.log(server.resolvedUrls);
};

bootstrap();

// State
React.useState;
React.useSyncExternalStore;
React.useReducer;

// Reference
React.useRef;
React.useImperativeHandle;

// Context
React.use;
React.useContext;
React.createContext;

// Effect
React.useEffect;
React.useEffectEvent;
React.useLayoutEffect;
React.useInsertionEffect;

// Preformance
React.useMemo;
React.useCallback;
React.memo;

// Node
React.Fragment;

// UI
React.useId;
React.Activity;

// Dev tools
React.StrictMode;
React.Profiler;
React.useDebugValue;

// Lazy loading
React.lazy;
React.Suspense;
// Transition
React.useTransition;
React.useDeferredValue;
React.useOptimistic;
React.useActionState;
React.startTransition;

/**
 * Transition 是可打断的，由它派发的更新队列会被打断（组件A执行完成后，兄弟组件B不一定会继续执行），直到 Transition 内的更新完成
 * Transition 的更新优先级较低，如果一次click同时触发了一个 Transition 和一个普通更新，Transition 内的更新会被打断，直到 Transition 内的更新完成·
 * Transition 不会导致Suspense被挂起
 */
