// @refresh reload
import { mount, StartClientTanstack } from "@solidjs/start/client";

// @bjesuiter: SolidJS CLIENT ENTRYPOINT, renders the TanstackRouterClient
mount(() => <StartClientTanstack />, document.getElementById("app")!);
