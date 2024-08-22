import machineRecRouter from "./machineRec";
import { Express } from "express";

export default (app: Express) => {
  app.use("/api", machineRecRouter);
};
