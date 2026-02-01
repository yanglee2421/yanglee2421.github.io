import * as url from "node:url";
import * as path from "node:path";
import { createServer } from "vite";

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
