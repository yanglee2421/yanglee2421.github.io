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

    iframeEl.contentWindow.addEventListener(
      "message",
      (evt) => {
        res(evt.data);
      },
      {
        once: true,
      }
    );
    iframeEl.contentWindow.addEventListener("messageerror", rej, {
      once: true,
    });

    iframeEl.contentWindow.postMessage(
      JSON.stringify({}),
      import.meta.env.VITE_SSO_ORIGIN,
      []
    );

    setTimeout(() => {
      rej(new Error("Time out"));
    }, 1000 * 30);
  });
}
