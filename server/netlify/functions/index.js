import serverless from "serverless-http";

import { app, router } from "../../server.js";

app.use("/", router);

export const handler = serverless(app);