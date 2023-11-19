export function mutate() {
  return new Promise((res, rej) => {
    const iframeEl = document.querySelector<HTMLIFrameElement>(
      `iframe[src^="${import.meta.env.VITE_SSO_ORIGIN}"]`
    );

    const isIframe = iframeEl instanceof HTMLIFrameElement;
    if (!isIframe) {
      throw new Error("Invalid HTMLIFrameElement");
    }

    if (!iframeEl.contentWindow) {
      throw new Error("Invalid contentWindow");
    }

    iframeEl.contentWindow.onmessage = (evt) => {
      res(evt.data);
    };
    iframeEl.contentWindow.onmessageerror = (evt) => {
      rej(evt.data);
    };

    iframeEl.contentWindow.postMessage(
      JSON.stringify({}),
      import.meta.env.VITE_SSO_ORIGIN,
      []
    );
  });
}
