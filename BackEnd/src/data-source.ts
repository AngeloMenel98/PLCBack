import "reflect-metadata";
import { DataSource } from "typeorm";
import { Machine, MachineRec, User, Request } from "./entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "127.0.0.1",
  port: 6543,
  username: "angelo",
  password: "M4rv3lvsDC",
  database: "plc_sensors",
  synchronize: true,
  logging: false,
  entities: [MachineRec, Machine, User, Request],
  migrations: [],
  subscribers: [],
});
