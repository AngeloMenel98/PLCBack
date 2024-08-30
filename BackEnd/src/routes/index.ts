import { Express } from "express";

import machineRecRouter from "./machineRec";
import userRouter from "./user";
import machineRouter from "./machine";

export default (app: Express) => {
  app.use("/api", machineRecRouter);
  app.use("/api", userRouter);
  app.use("/api", machineRouter);
};
