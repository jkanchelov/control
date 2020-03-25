import * as express from "express";

import { Express } from "express";

import getClientRoute from "./clients/get-clients";

export default (app: Express): void => {
    const port = process.env.PORT || 3001;
    console.log("initializing router");

    const router = express.Router();

    router.use(getClientRoute);

    app.use("/api", router);
    app.listen(port);

    console.log(`${new Date().toLocaleTimeString()}: Port - ${port}`);
};
